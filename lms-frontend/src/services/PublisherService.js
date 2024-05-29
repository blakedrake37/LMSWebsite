import axios from "axios";

const PUBLISHER_API_BASE_URL = 'http://localhost:8080/api/v1/publishers'

export const listPublishers = () => axios.get(PUBLISHER_API_BASE_URL);

export const createPublisher = (publisher) => axios.post(PUBLISHER_API_BASE_URL, publisher);

export const getPublisher = (publisherId) => axios.get(PUBLISHER_API_BASE_URL+'/'+publisherId);

export const updatePublisher = (publisherId, publisher) => axios.put(PUBLISHER_API_BASE_URL+'/'+publisherId, publisher)

