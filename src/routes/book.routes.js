import { Router } from "express";
import {
    getSavedBooks,
    saveBook,
    getInitialBooks,
    searchBooks,
    deleteBook,
} from '../controllers/books.controller.js';

const router = Router();

// Endpoint para buscar libros según query
router.get('/api/books/search', searchBooks);

// Endpoint para obtener 50 libros iniciales en español
router.get('/api/books/initial', getInitialBooks);

// Endpoint para guardar un libro
router.post('/api/books', saveBook);

// Endopoint para eliminar un libro de 'Mis libros guardados'
router.delete('/api/books', deleteBook);

// Endpoint para listar los libros guardados
router.get('/api/books/saved', getSavedBooks);

export default router;