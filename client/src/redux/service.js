import axios from 'axios';

const API_BASE_URL = 'http://localhost:8900'; // Replace with your API base URL
const loginService = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const registerService = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const ListArticle = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/list`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const updateProfile = async (data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const getUser = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const saveArticle = async(data) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/save`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }

}

const getBookmarks = async(data) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/getBookmark`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }

}

export const service = {
    loginService,
    registerService,
    ListArticle,
    updateProfile,
    getUser,
    saveArticle,
    getBookmarks
};
