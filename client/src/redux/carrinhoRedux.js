import { createSlice } from "@reduxjs/toolkit";

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: {
    produtos: [],
    quantidade: 0,
    total: 0,
  },
  reducers: {
    adicionarProduto: (estado_anterior, action) => {
      estado_anterior.quantidade += 1;
      estado_anterior.produtos.push(action.payload); // PAYLOAD = novo produto
      estado_anterior.total += action.payload.preco * action.payload.quantidade;
    },    
    excluirProduto : (estado_anterior, action) => {
      estado_anterior.quantidade -= 2;
      estado_anterior.produtos = estado_anterior.produtos.filter( (item) => item.id_variacao_root !== action.id);
      estado_anterior.total -= action.totalPrice;

    },
    excluirProdutoDois: (state, { payload }) => {
      state.quantidade -= 1
      state.produtos = state.produtos.filter( x=> x.id_variacao_root !== payload.id

      )
      state.total -= payload.totalPrice
    },
    resetarCarrinhoSucesso: (estado_anterior, action) => {
      estado_anterior.quantidade = 0;
      estado_anterior.produtos= []; // PAYLOAD = novo produto
      estado_anterior.total = 0;

    },
    atualizarProduto: (state, { payload }) => {
      
      state.produtos = state.produtos.map((product) => 

      product.id_variacao_root === payload.id 
        ? { ...product, quantidade:   payload.quantidade + product.quantidade}
        : product
        )
      state.total += payload.quantidade < 1 ? -payload.preco : payload.preco
      
      
    },
  },
});

export const { adicionarProduto,resetarCarrinhoSucesso,atualizarProduto,excluirProduto } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
