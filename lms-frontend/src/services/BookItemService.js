import axios from 'axios';

const BOOKITEM_API_BASE_URL = 'http://localhost:8080/api/v1/bookItems';

export const listBookItems = () => axios.get(BOOKITEM_API_BASE_URL);

export const createBookItem = (bookItem) => axios.post(BOOKITEM_API_BASE_URL, bookItem);

export const getBookItem = (bookItemID) => axios.get(BOOKITEM_API_BASE_URL+'/'+bookItemID);

export const updateBookItem = (bookItemID, bookItem) => axios.put(BOOKITEM_API_BASE_URL+'/'+bookItemID, bookItem);

export const deleteBookItem = (bookItemID) => axios.delete(BOOKITEM_API_BASE_URL+'/'+bookItemID);