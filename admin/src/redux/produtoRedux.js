import { createSlice } from "@reduxjs/toolkit";

export const produtoSlice = createSlice({
  name: "produto",
  initialState: {
    produtos: [],
    isFetching: false,
    error: false,
  },
  reducers: { 
    //GET ALL
    getProdutoInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProdutoSucesso: (state, action) => {
      state.isFetching = false;
      state.produtos = action.payload;
    },
    getProdutoFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteProdutoInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProdutoSucesso: (state, action) => {
      state.isFetching = false;
      state.produtos.splice(
        state.produtos.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProdutoFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProdutoInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProdutoSucesso: (state, action) => {
      state.isFetching = false;
      state.produtos[
        state.produtos.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.produto;
    },
    updateProdutoFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addProdutoInicio: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProdutoSucesso: (state, action) => {
      state.isFetching = false;
      state.produtos.push(action.payload);
    },
    addProdutoFalha: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
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
} = produtoSlice.actions;

export default produtoSlice.reducer;