import axios from "axios";

const AUTHOR_API_BASE_URL = 'http://localhost:8080/api/v1/authors'

export const listAuthors = () => axios.get(AUTHOR_API_BASE_URL);

export const createAuthor = (author) => axios.post(AUTHOR_API_BASE_URL, author);

export const getAuthor = (authorId) => axios.get(AUTHOR_API_BASE_URL+'/'+authorId);

export const updateAuthor = (authorId, author) => axios.put(AUTHOR_API_BASE_URL+'/'+authorId, author);