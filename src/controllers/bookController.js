import path from 'path';
import { v4 as uuid } from 'uuid';
import { readJSON, writeJSON } from '../utils/fileHandler.js';
import { paginate } from '../utils/paginate.js';

const booksFile = path.resolve('src/models/books.json');

const readBooks = async () => {
  try {
    return await readJSON(booksFile);
  } catch (err) {
    return [];
  }
};


const writeBooks = async (books) => {
  await writeJSON(booksFile, books);
};


export const getAllBooks = async (req, res, next) => {
  try {
    const books = await readBooks();
    let userBooks = books.filter(book => book.userId === req.user.id);

    const { page, limit, genre } = req.query;

    if (genre) {
      userBooks = userBooks.filter(book => book.genre === genre);
    }

    const paginated = paginate(userBooks, page, limit);

    return res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: paginated,
    });
  } catch (err) {
    next(err);
  }
};


export const getBookById = async (req, res, next) => {
  try {
    const books = await readBooks();
    const book = books.find((b) => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    return res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBook = {
      id: uuid(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.user.id,
    };

    const books = await readBooks();
    books.push(newBook);
    await writeBooks(books);

    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

export const getAllBooksByUser = async (req, res, next) => {
  try {
    const books = await readBooks();
    let userBooks = books.filter((b) => b.userId === req.user.id);

    const { page, limit, genre } = req.query;
    if (genre) {
      userBooks = userBooks.filter(book => book.genre === genre);
    }
    const paginated = paginate(userBooks, page, limit);

    return res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: paginated,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const books = await readBooks();
    const bookIndex = books.findIndex((b) => b.id === req.params.id);

    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    const book = books[bookIndex];

    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: Not your book' });
    }

    const updatedBook = { ...book, ...req.body, id: book.id, userId: book.userId };
    books[bookIndex] = updatedBook;
    await writeBooks(books);

    return res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const books = await readBooks();
    const bookIndex = books.findIndex((b) => b.id === req.params.id);

    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    const book = books[bookIndex];

    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: Not your book' });
    }

    books.splice(bookIndex, 1);
    await writeBooks(books);

    return res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getBooksByGenre = async (req, res, next) => {
  try {
    const books = await readBooks();
    const { genre, page, limit } = req.query;
    const paginated = paginate(books, page, limit, genre);
    return res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: paginated,
    });
  } catch (err) {
    next(err);
  }
};
