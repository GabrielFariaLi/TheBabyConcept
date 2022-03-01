import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL


const utilizador = JSON.parse(localStorage.getItem("persist:root"))?.utilizador;
const utilizadorAtual = utilizador && JSON.parse(utilizador).utilizadorAtual;
const TOKEN = utilizadorAtual?.accessToken;

const axiosInstancia = axios.create({baseURL: process.env.REACT_APP_API_URL})

// caso a ação dependa de um administrador

export const userRequest = axiosInstancia.create({
  baseURL:BASE_URL,
  headers:{token:`Bearer ${TOKEN}`}

});

// caso não
export const publicRequest = axiosInstancia.create({
  baseURL:BASE_URL
});
