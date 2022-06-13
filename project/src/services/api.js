import axios from 'axios';

const api = axios.create({ 
    baseURL : 'https://api.themoviedb.org/3/'
    //URL DA API : movie/550?
});

export default api;
