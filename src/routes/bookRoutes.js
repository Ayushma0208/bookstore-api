import express from 'express';
import {
    createBook,
    deleteBook,
    getAllBooks,
    getAllBooksByUser,
    getBookById,
    getBooksByGenre,
    updateBook,
} from '../controllers/bookController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);

router.get('/get_all_books', getAllBooks);
router.get('/get_book/:id', getBookById);
router.get('/get_books_by_user', getAllBooksByUser);
router.post('/create_book', createBook);
router.put('/update_book/:id', updateBook);
router.delete('/delete_book/:id', deleteBook);
router.get('/search', getBooksByGenre);

export default router;
