import { createSlice } from "@reduxjs/toolkit";

const utilizadorSlice = createSlice({
  name: "utilizador",
  initialState: {
    utilizadorAtual: null,
    utilizadores: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    loginInicio: (state) => {
      state.isFetching = true;
    },
    loginSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadorAtual = action.payload;
    },
    loginFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout:(state) => {
      state.utilizadorAtual = null;
    },
    //GET ALL
    getUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores = action.payload;
    },
    getUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores.splice(
        state.utilizadores.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores[
        state.utilizadores.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.utilizadr;
    },
    updateUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addUtilizadorInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUtilizadorSucesso: (state, action) => {
      state.isFetching = false;
      state.utilizadores.push(action.payload);
    },
    addUtilizadorFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  
  },
});

export const { loginInicio, loginSucesso, loginFalha, logout,
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
  addUtilizadorFalha, } = utilizadorSlice.actions;
export default utilizadorSlice.reducer;