import axios from "axios";

const BORROW_API_BASE_URL = 'http://localhost:8080/api/v1/borrows'

export const listBorrows = () => axios.get(BORROW_API_BASE_URL);

export const getBorrow = (borrowId) => axios.get(BORROW_API_BASE_URL+'/'+borrowId);

export const createBorrow = (borrow) => axios.post(BORROW_API_BASE_URL, borrow);

export const updateBorrow = (borrowId, borrow) => axios.put(BORROW_API_BASE_URL+'/'+borrowId, borrow);

export const deleteBorrow = (borrowId) => axios.delete(BORROW_API_BASE_URL+'/'+borrowId);