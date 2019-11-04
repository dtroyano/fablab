import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://delgado-fab-lab.firebaseio.com/'
});

export default instance;