import axios from "axios";

const CATEGORY_API_BASE_URL = 'http://localhost:8080/api/v1/categories'

export const listCategories = () => axios.get(CATEGORY_API_BASE_URL);

export const createCategory = (category) => axios.post(CATEGORY_API_BASE_URL, category);

export const getCategory = (categoryId) => axios.get(CATEGORY_API_BASE_URL+'/'+categoryId);

export const updateCategory = (categoryId, category) => axios.put(CATEGORY_API_BASE_URL+'/'+categoryId, category);