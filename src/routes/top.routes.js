import express from "express";
import axios from "axios";
import Like from "../models/like.js";

const router = express.Router();
const gutendexUrl = "https://gutendex.com/books/";
const openLibUrl = "https://openlibrary.org/search.json";

/**
 * Obtener los libros con más likes y buscar detalles por título.
 */
router.get("/top-books", async (req, res) => {
  try {
    const topBooks = await Like.aggregate([
      {
        $project: {
          bookTitle: 1, 
          likeCount: { $size: "$likes" } // Contamos los likes
        }
      },
      { $sort: { likeCount: -1 } }, // Ordenar de mayor a menor
      { $limit: 10 } // Limitar a los 10 libros con más likes
    ]);
    // Buscar los detalles en la API usando el título del libro
    const booksWithDetails = await Promise.all(
      topBooks.map(async (book) => {
        try {
          // Consultar ambas APIs
          const [gutendexResponse, openLibResponse] = await Promise.all([
            axios.get(`${gutendexUrl}?languages=es&search=${encodeURIComponent(book.bookTitle)}`),
            axios.get(`${openLibUrl}?language=es&has_fulltext=true&q=${encodeURIComponent(book.bookTitle)}`)
          ]);
          // Extraer información de Gutendex
          const gutendexBooks = gutendexResponse.data.results.map(b => ({
            title: b.title,
            authors: b.authors.map(author => author.name),
            url: b.formats["text/html"] || b.formats["application/pdf"] || null,
            apiSource: "gutendex",
            cover: b.formats["image/jpeg"] || null
          }));

          // Extraer información de Open Library
          const openLibBooks = openLibResponse.data.docs
            .filter(b => b.ebook_access === "borrowable" || b.ebook_access === "public" || b.has_fulltext)
            .map(b => ({
              title: b.title,
              authors: b.author_name || [],
              url: `https://openlibrary.org${b.key}`,
              apiSource: "openlibrary",
              cover: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : null
            }));

          // Seleccionar el primer libro encontrado
          const bookDetails = [...gutendexBooks, ...openLibBooks][0] || null;
          
          return bookDetails ? { ...bookDetails, likeCount: book.likeCount } : null;
        } catch (error) {
          console.error(`Error buscando detalles para "${book.bookTitle}":`, error);
          return null;
        }
      })
    );

    res.json(booksWithDetails.filter(book => book !== null));

  } catch (error) {
    console.error("Error al obtener los libros más populares:", error);
    res.status(500).json({ message: "Error al obtener los libros más populares." });
  }
});

export default router;
