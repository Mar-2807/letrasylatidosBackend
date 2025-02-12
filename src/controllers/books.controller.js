import axios from 'axios';
import Book from '../models/book.js';
import User from '../models/user.js';
import Teacher from '../models/teachers.js';

/**
 * Función para buscar libros en español a partir de un query.
 */
export const searchBooks = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: 'El query es obligatorio.' });

  try {
    // URLs de las APIs externas
    const gutendexUrl = `https://gutendex.com/books/?languages=es&search=${encodeURIComponent(query)}`;
    const openLibUrl = `https://openlibrary.org/search.json?language=es&has_fulltext=true&q=${encodeURIComponent(query)}`;

    // Hacemos ambas llamadas en paralelo
    const [gutendexResponse, openLibResponse] = await Promise.all([
      axios.get(gutendexUrl),
      axios.get(openLibUrl)
    ]);

    // Procesar resultados de Gutendex
    const gutendexBooks = gutendexResponse.data.results.map(book => ({
      id: book.id,
      title: book.title,
      authors: book.authors.map(author => author.name),
      url: book.formats['text/html'] || book.formats['application/pdf'] || null,
      apiSource: 'gutendex',
      cover: book.formats['image/jpeg'] || null,
    }));

    // Procesar resultados de Open Library
    const openLibBooks = openLibResponse.data.docs
      .filter(book => book.ebook_access === 'borrowable' || book.ebook_access === 'public' || book.has_fulltext)
      .map(book => ({
        id: book.id,
        title: book.title,
        authors: book.author_name || [],
        url: `https://openlibrary.org${book.key}`,
        apiSource: 'openlibrary',
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
      }));

    const results = [...gutendexBooks, ...openLibBooks];

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron libros.' });
    }

    res.json(results);
  } catch (error) {
    console.error('Error en searchBooks:', error.message);
    res.status(500).json({ message: 'Error al consultar las APIs externas.' });
  }
};

/**
 * Función para obtener 50 libros iniciales en español (para la página principal).
 */
export const getInitialBooks = async (req, res) => {
  try {
    const query = "libro";
    const gutendexUrl = `https://gutendex.com/books/?languages=es&search=${encodeURIComponent(query)}`;
    const openLibUrl = `https://openlibrary.org/search.json?language=es&has_fulltext=true&q=${encodeURIComponent(query)}`;

    // Hacemos ambas llamadas en paralelo
    const [gutendexResponse, openLibResponse] = await Promise.all([
      axios.get(gutendexUrl),
      axios.get(openLibUrl)
    ]);

    // Procesar resultados
    const gutendexBooks = gutendexResponse.data.results.slice(0, 25).map(book => ({
      id: book.id,
      title: book.title,
      authors: book.authors.map(author => author.name),
      url: book.formats['text/html'] || book.formats['application/pdf'] || null,
      apiSource: 'gutendex',
      cover: book.formats['image/jpeg'] || null
    }));

    const openLibBooks = openLibResponse.data.docs
      .filter(book => book.ebook_access === 'borrowable' || book.ebook_access === 'public')
      .slice(0, 25)
      .map(book => ({
        id: book.id,
        title: book.title,
        authors: book.author_name || [],
        url: `https://openlibrary.org${book.key}`,
        apiSource: 'openlibrary',
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
      }));

    res.json([...gutendexBooks, ...openLibBooks]);
  } catch (error) {
    console.error('Error en getInitialBooks:', error.message);
    res.status(500).json({ message: 'Error al obtener los libros iniciales.' });
  }
};

/**
 * Función para guardar la información de un libro en la base de datos.
 */
export const saveBook = async (req, res) => {
  try {
    const { book, userId } = req.body; // Extraer correctamente

    if (!book || !userId) {
      return res.status(400).json({ message: 'book y userId son requeridos.' });
    }

    const { title, authors, url, apiSource, cover } = book; // Extraer datos del libro
    
    if (!title) {
      return res.status(400).json({ message: 'El título es obligatorio.' });
    }

    const student = await User.findById(userId);
    const teacher = await Teacher.findById(userId);
    let userType = "";

    if (teacher) userType = "Teacher";
    if (student) userType = "User";
    
    if (!userType) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const newBook = new Book({ savedById: userId, savedByModel: userType, title, authors, url, apiSource, cover });
    await newBook.save();

    res.status(201).json({ message: 'Libro guardado correctamente.', book: newBook });
  } catch (error) {
    console.error('Error en saveBook:', error.message);
    res.status(500).json({ message: 'Error al guardar el libro.' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { book, userId } = req.query; // Extraer correctamente

    if (!book || !userId) {
      return res.status(400).json({ message: 'book y userId son requeridos.' });
    }
    const { title, authors, url } = book; // Extraer datos del libro

    await Book.findOneAndDelete({savedById: userId, title: title, authors: authors, url: url })

    res.status(201).json({ message: 'Libro eliminado correctamente.' });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro.' });
  } 
}


/**
 * Función para listar los libros guardados en la base de datos.
 */
export const getSavedBooks = async (req, res) => {
  try {
    const { userId } = req.query;
    const books = await Book.find({ savedById: userId }).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error('Error en getSavedBooks:', error.message);
    res.status(500).json({ message: 'Error al obtener los libros guardados.' });
  }
};
