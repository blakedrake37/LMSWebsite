import axios from "axios";

const BOOK_API_BASE_URL = 'http://localhost:8080/api/v1/books'

export const listBooks = () => axios.get(BOOK_API_BASE_URL);

export const getBook = (bookId) => axios.get(BOOK_API_BASE_URL+'/'+bookId);

export const createBook = (book) => axios.post(BOOK_API_BASE_URL, book);

export const updateBook = (bookId, book) => axios.put(BOOK_API_BASE_URL+'/'+bookId, book);

export const deleteBook = (bookId) => axios.delete(BOOK_API_BASE_URL+'/'+bookId);