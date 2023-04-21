import axios from 'axios';
import { server } from './server';
const API = axios.create({ baseURL: server });
export default API;
