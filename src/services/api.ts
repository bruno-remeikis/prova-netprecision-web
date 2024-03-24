import axios from 'axios'

export const url = 'https://prova-netprecision-bruno-rmks-372131324b1e.herokuapp.com' //'http://localhost:8080'

export const api = axios.create({
    baseURL: url,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        //'Content-Type': 'application/json'
        "Access-Control-Allow-Credentials": 'true',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        "Access-Control-Allow-Headers": 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
    }
});