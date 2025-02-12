// Search Books
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { postLikeRequest, countLikesRequest, isLikedRequest } from "../api/likes";
import { API_URL } from '../../config.js';

export default function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const userId = user.id;

  useEffect(() => {
    loadInitialBooks();
    loadSavedBooks();
  }, []);

  async function loadInitialBooks() {
    try {
      const { data } = await axios.get(`${API_URL}/api/books/initial`);
      setBooks(data);
    } catch (error) {
      showNotification("No se pudo cargar los libros iniciales.");
    }
  }

  async function loadSavedBooks() {
    try {
      const { data } = await axios.get(`${API_URL}/api/books/saved`, { params: { userId } });
      setSavedBooks(data);
    } catch (error) {
      showNotification("No se pudieron cargar los libros guardados.");
    }
  }

  async function searchBooks(query) {
    setSearchQuery(query);
    if (!query) {
      loadInitialBooks();
      return;
    }
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const { data } = await axios.get(`${API_URL}/api/books/search`, {
        params: { query },
      });
      setBooks(data);
    } catch (error) {
      showNotification("No se encontraron libros.");
    } finally {
      setLoading(false);
    }
  }

  async function saveBook(book) {
    try {
      await axios.post(`${API_URL}/api/books`, { book, userId });
      showNotification("Libro guardado correctamente.");
      loadSavedBooks();
    } catch (error) {
      showNotification("Error al guardar el libro.");
    }
  }

  async function deleteBook(book) {
    try {
      await axios.delete(`${API_URL}/api/books`, { params: { book, userId } });
      showNotification("Libro eliminado correctamente.");
      loadSavedBooks();
    } catch (error) {
      showNotification("Error al eliminar el libro.");
    }
  }

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  }

  return (
    <div className="font-poppins">
      <input
        type="text"
        placeholder="Buscar libros en español..."
        className="w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2"
        value={searchQuery}
        onChange={(e) => searchBooks(e.target.value)}
      />

      {notification && <div className="p-2 bg-red-light text-red rounded mt-2">{notification}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 bg-green-creme p-6 rounded-md">
        {loading ? <p>Cargando libros...</p> : <></>}
        {error ? <p style={{ color: "red" }}>{error}</p> : <></>}
        {books.map((book) => (
          <BookCard key={book.id} book={book} onSave={saveBook} userId={userId} />
        ))}
      </div>

      <div className="flex gap-2">
        <h2 className="text-2xl font-semibold mt-8">
          <i className="bi bi-bookmark-check"> </i>Mis Libros Guardados
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 bg-blue-creme rounded-md p-6">
        {savedBooks && savedBooks.length > 0 ? (
          savedBooks.map((book, index) => <BookCard key={index} book={book} onDelete={deleteBook} />)
        ) : (
          <h1>No has guardado ningún libro</h1>
        )}
      </div>
    </div>
  );
}

export function BookCard({ book, onSave, userId, onDelete }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await countLikesRequest(book.id);
        setLikesCount(response.data.likes || 0);
      } catch (error) {
        console.error("Error al obtener cantidad de likes:", error);
        setLikesCount(0);
      }
    };

    const checkIsLiked = async () => {
      try {
        const res = await isLikedRequest(book.id, userId);
        setLiked(res.data.liked);
      } catch (error) {
        console.error("Error al verificar like:", error);
      }
    };

    checkIsLiked();
    fetchLikes();
  }, [book.id, userId]);

  const handleLike = async () => {
    try {
      const response = await postLikeRequest(book.id, book.title, userId);
      console.log(response);
      setLikesCount(response.data.likes);
      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error al actualizar el like:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        src={book.cover || "https://via.placeholder.com/150"}
        alt={book.title}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h3 className="text-xl font-bold mb-1">{book.title}</h3>
      <p className="text-gray-700 mb-2">{book.authors.join(", ")}</p>
      <div className="flex justify-between items-end flex-wrap gap-2">
        <div className="flex justify-start gap-2">
          <a href={book.url} target="_blank" className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-true">
            Leer
          </a>
          {onSave && (
            <button
              onClick={() => onSave(book)}
              className="bg-green-normal text-white px-4 py-2 rounded hover:bg-green-true"
            >
              Guardar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(book)}
              className="bg-red text-white px-4 py-2 rounded hover:bg-red-dark"
            >
              Eliminar
            </button>
          )}
        </div>
        {userId && (
          <div className="flex gap-2 items-center">
            <button onClick={handleLike}>
              {liked ? (
                <i className="bi bi-suit-heart-fill text-red"></i>
              ) : (
                <i className="bi bi-suit-heart text-black"></i>
              )}
            </button>
            <p>{likesCount}</p>
          </div>
        )}
      </div>
    </div>
  );
}