import axios from 'axios';

const apiUrl = 'http://localhost:3001';

const httpService = {
    fetchTrendVideos(config = {}) {
        return axios.get(`${apiUrl}/videos/trend`, config);
    },
    fetchSavedVideos(config = {}) {
        return axios.get(`${apiUrl}/videos`, config);
    },
    searchVideos(config = {}) {
        return axios.get(`${apiUrl}/videos/search`, config);
    },
    saveVideo(id, config = {}) {
        return axios.put(`${apiUrl}/videos/${id}`, config);
    },
    deleteVideo(id, config = {}) {
        return axios.delete(`${apiUrl}/videos/${id}`, config);
    },
    fetchVideoInfo(id, config = {}) {
        return axios.get(`${apiUrl}/videos/${id}`, config);
    }
};

export default httpService;
