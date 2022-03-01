import { loginInicio, loginSucesso, loginFalha, logoutSucesso,logoutInicio,logoutFalha,registrarInicio,registrarSucesso,registrarFalha } from "./utilizadorRedux";
import {  resetarCarrinhoSucesso} from "./carrinhoRedux"
import { publicRequest } from "../requestMetodos";

export const login = async (dispatch, user) => {
  dispatch(loginInicio());
  try {
    const res = await publicRequest.post("/autenticacao/login", user);
    dispatch(loginSucesso(res.data)); //payload in redux
  } catch (err) {
    dispatch(loginFalha());
  }
};
export const logout = async (dispatch) => {
  dispatch(logoutInicio());
  try {
   
    dispatch(logoutSucesso()); //payload in redux
  } catch (err) {
    dispatch(logoutFalha());
  }

};

export const registrarUtilizador = async (dispatch, utilizador) => {
  dispatch(registrarInicio());
  try {
    const res = await publicRequest.post("/autenticacao/registrar", utilizador);
    dispatch(registrarSucesso(res.data)); //payload in redux
  } catch (err) {
    dispatch(registrarFalha());
  }

};

export const resetarCarrinho = async (dispatch) => {
  dispatch(resetarCarrinhoSucesso());
  try {
    dispatch(resetarCarrinhoSucesso()); //payload in redux
  } catch (err) {
    dispatch(resetarCarrinhoSucesso());
  }

};




