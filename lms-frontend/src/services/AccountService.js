import axios from 'axios';

const ACCOUNT_API_BASE_URL = 'http://localhost:8080/api/accounts';

export const listAccounts = () => axios.get(ACCOUNT_API_BASE_URL);

export const createAccount = (account) => axios.post(ACCOUNT_API_BASE_URL, account);

export const getAccount = (accountID) => axios.get(ACCOUNT_API_BASE_URL+'/'+accountID);

export const updateAccount = (accountID, account) => axios.put(ACCOUNT_API_BASE_URL+'/'+accountID, account);

export const deleteAccount = (accountID) => axios.delete(ACCOUNT_API_BASE_URL+'/'+accountID);