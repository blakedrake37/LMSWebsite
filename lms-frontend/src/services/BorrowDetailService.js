import axios from "axios";

const BORROW_DETAIL_API_BASE_URL = 'http://localhost:8080/api/v1/borrowDetails'

export const listBorrowDetails = () => axios.get(BORROW_DETAIL_API_BASE_URL);

export const getBorrowDetail = (borrowDetailId) => axios.get(BORROW_DETAIL_API_BASE_URL+'/'+borrowDetailId);

export const createBorrowDetail = (borrowDetail) => axios.post(BORROW_DETAIL_API_BASE_URL, borrowDetail);

export const updateBorrowDetail = (borrowDetailId, borrowDetail) => axios.put(BORROW_DETAIL_API_BASE_URL+'/'+borrowDetailId, borrowDetail);

export const deleteBorrowDetail = (borrowDetailId) => axios.delete(BORROW_DETAIL_API_BASE_URL+'/'+borrowDetailId);