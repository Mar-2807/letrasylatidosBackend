//Foro Book Card
import { useEffect, useState } from "react";
import { BookCard } from "./SearchBooks";
import { useParams } from "react-router-dom";
import { useForos } from "../context/ForosContext";
import axios from "axios";

const apiBaseUrl = "http://localhost:4000/api/books";

function ForoBookCard({ foro }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { getForo } = useForos();
  const params = useParams();

  useEffect(() => {
    getForo(params.id);
  }, [params.id]);

  useEffect(() => {
    if (!foro.bookTitle) return; // No buscar si no hay título

    async function fetchBookByTitle() {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${apiBaseUrl}/search`, {
          params: { query: foro.bookTitle }
        });

        if (data.length > 0) {
          setBook(data[0]); // Tomar el primer resultado
        } else {
          setBook(null);
          setError("No se encontró el libro asignado.");
        }
      } catch (error) {
        setError("Error al buscar el libro.");
        console.error("Error al buscar el libro:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookByTitle();
  }, [foro.bookTitle]); // Solo se ejecuta cuando el título cambia

  return (
    <div>
      {error && <p className="p-4 bg-orange-light text-orange rounded-md">El libro no está disponible</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 bg-green-creme p-6 rounded-md">
        {loading && <p className="col-span-full text-center">Cargando libro...</p>}
        {book ? (
          <BookCard book={book} />
        ) : (
          !loading && (
            <>
              <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                <img
                  src="/bookCover/default-cover.png"
                  alt={foro.bookTitle}
                  className="w-full max-w-xs h-48 object-cover mb-2 rounded"
                />
                <h3 className="text-xl font-bold mb-1 text-center">{foro.bookTitle}</h3>
                <p className="text-gray-700 mb-2 text-center">{foro.author}</p>
                <div className="text-center text-sm text-gray-600">
                  <p>El libro será proporcionado en clase por el docente</p>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default ForoBookCard;