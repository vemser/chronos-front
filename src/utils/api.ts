import axios from 'axios';

export const api = axios.create({
    baseURL: "http://vemser-dbc.dbccompany.com.br:39000/vemser/dbc-pessoa-api"
})
