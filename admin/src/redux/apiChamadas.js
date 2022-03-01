import { loginInicio, loginSucesso, loginFalha,
  getUtilizadorInicio,
  getUtilizadorSucesso,
  getUtilizadorFalha,
  deleteUtilizadorInicio,
  deleteUtilizadorSucesso,
  deleteUtilizadorFalha,
  updateUtilizadorInicio,
  updateUtilizadorSucesso,
  updateUtilizadorFalha,
  addUtilizadorInicio,
  addUtilizadorSucesso,
  addUtilizadorFalha, } from "./utilizadorRedux";
import { publicRequest, userRequest } from "../requestMetodos";
import {
  getProdutoInicio,
  getProdutoSucesso,
  getProdutoFalha,
  deleteProdutoInicio,
  deleteProdutoSucesso,
  deleteProdutoFalha,
  updateProdutoInicio,
  updateProdutoSucesso,
  updateProdutoFalha,
  addProdutoInicio,
  addProdutoSucesso,
  addProdutoFalha,
} from "./produtoRedux";

//UTILIZADOR 
export const login = async (dispatch, user) => {
  dispatch(loginInicio());
  try {
    const res = await publicRequest.post("/autenticacao/login", user);
    dispatch(loginSucesso(res.data)); //payload in redux
    console.log(res.data)
  } catch (err) {
    dispatch(loginFalha());
  }
};
export const getUtilizadores = async (dispatch) => {
  dispatch(getUtilizadorInicio());
  try {
    const res = await userRequest.get("/utilizador");
    dispatch(getUtilizadorSucesso(res.data));
  } catch (err) {
    dispatch(getUtilizadorFalha());
  }
};



export const deleteUtilizador = async (id, dispatch) => {
  dispatch(deleteUtilizadorInicio());
  try {
    const res = await userRequest.delete(`/utilizador/${id}`);
    dispatch(deleteUtilizadorSucesso(id));
  } catch (err) {
    dispatch(deleteUtilizadorFalha());
  }
};

export const updateUtilizador = async (id, utilizador, dispatch) => {
  dispatch(updateUtilizadorInicio());
  try {
    const res = await userRequest.put(`/utilizador/${id}`, utilizador);
    dispatch(updateUtilizadorSucesso({ id, utilizador }));
  } catch (err) {
    dispatch(updateUtilizadorFalha());
  }
};
export const addUtilizador = async (utilizador, dispatch) => {
  dispatch(addUtilizadorInicio());
  try {
    const res = await userRequest.post(`/utilizador`, utilizador);
    dispatch(addUtilizadorSucesso(res.data));
  } catch (err) {
    dispatch(addUtilizadorFalha());
  }
};

// PRODUTOS

export const getProdutos = async (dispatch) => {
  dispatch(getProdutoInicio());
  try {
    const res = await publicRequest.get("/produto");
    dispatch(getProdutoSucesso(res.data));
  } catch (err) {
    dispatch(getProdutoFalha());
  }
};

export const deleteProduto = async (id, dispatch) => {
  dispatch(deleteProdutoInicio());
  try {
    const res = await userRequest.delete(`/produto/${id}`);
    dispatch(deleteProdutoSucesso(id));
  } catch (err) {
    dispatch(deleteProdutoFalha());
  }
};

export const updateProduto = async (id, produto, dispatch) => {
  dispatch(updateProdutoInicio());
  try {
    //const res = await userRequest.put(`/produto/${id}`, produto);
    dispatch(updateProdutoSucesso({ id, produto }));
  } catch (err) {
    dispatch(updateProdutoFalha());
  }
};
export const addProduto = async (produto, dispatch) => {
  dispatch(addProdutoInicio());
  try {
    const res = await userRequest.post(`/produto`, produto);
    dispatch(addProdutoSucesso(res.data));
  } catch (err) {
    dispatch(addProdutoFalha());
  }
};

/* Transacoes 

export const getTransacoes = async (dispatch) => {
  dispatch(getTransacaoInicio());
  try {
    const res = await userRequest.get("/pedido");
    dispatch(getTransacaoSucesso(res.data));
  } catch (err) {
    dispatch(getTransacaoFalha());
  }
};

export const deleteTransacao = async (id, dispatch) => {
  dispatch(deleteTransacaoInicio());
  try {
    const res = await userRequest.delete(`/pedido/${id}`);
    dispatch(deleteTransacaoSucesso(id));
  } catch (err) {
    dispatch(deleteTransacaoFalha());
  }
};

export const updateTransacao = async (id, transacao, dispatch) => {
  dispatch(updateTransacaoInicio());
  try {
    //const res = await userRequest.put(`/produto/${id}`, produto);
    dispatch(updateTransacaoSucesso({ id, transacao }));
  } catch (err) {
    dispatch(updateTransacaoFalha());
  }
};*/

