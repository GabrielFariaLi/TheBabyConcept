import { createSlice } from "@reduxjs/toolkit";

const utilizadorSlice = createSlice({
  name: "utilizador",
  initialState: {
    utilizadorAtual: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //LOGIN
    loginInicio: (state) => {
      state.isFetching = true;
      state.emailExistente = false;
      state.error = false;
    },
    loginSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadorAtual = action.payload;
      state.emailExistente = false;
      state.error = false;
    },
    loginFalha: (state) => {
      state.isFetching = false;
      state.error = true;
      state.emailExistente = false;
    },    
    //LOGOUT
    logoutSucesso: (state) => {
      state.isFetching = false;
      state.utilizadorAtual = null;
      state.error = false;
      
    },
    logoutInicio: (state) => {
      state.isFetching = true;
      state.utilizadorAtual = null;
      state.error = false;
    },
    logoutFalha: (state) => {
      state.isFetching = false;
      state.utilizadorAtual = null;
      state.error = true;
    },    
    //REGISTRAR
    registrarInicio: (state) => {
      state.isFetching = true;
      state.emailExistente = false;

    },
    registrarSucesso: (state, action) => {
      state.isFetching = false;
      //state.utilizadorAtual = action.payload;
      state.emailExistente = false;
   
    },
    registrarFalha: (state) => {
      state.isFetching = false;
      state.error = true;
      state.emailExistente = true;
    
    },


  },
});

export const { 
  loginInicio, 
  loginSucesso, 
  loginFalha, 
  logoutSucesso, 
  logoutInicio, 
  logoutFalha,
  registrarInicio,
  registrarSucesso,
  registrarFalha,

} = utilizadorSlice.actions;
export default utilizadorSlice.reducer;