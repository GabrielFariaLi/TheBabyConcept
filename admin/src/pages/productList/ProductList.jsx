import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduto, getProdutos } from "../../redux/apiChamadas";


export default function ProductList() {



  const dispatch = useDispatch();
  window.onload = function() {
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }
  const produtos = useSelector((state) => state.produto.produtos);
  const state = useSelector((state) => state);
  console.log(state)
  useEffect(() => {
    
    getProdutos(dispatch);
  }, [dispatch]);

  const gerirDelete = (id) => {
    const resultado = window.confirm('Tem certeza que deseja remover este produto?');
    if(resultado == true){
      deleteProduto(id, dispatch);
    }
 
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "produto",
      headerName: "Produto",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.titulo}
          </div>
        );
      },
    },
    { field: "emEstoque", headerName: "Em estoque", width: 200 },
    {
      field: "preco",
      headerName: "Preco",
      width: 160,
    },
    {
      field: "acao",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminProduto/" + params.row._id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => gerirDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">

        <Link class="float"to="/adminNovoProduto">
          <button className="addProdutoButton">Criar</button>
        </Link>
      <DataGrid
        rows={produtos}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      {}
    </div>
  );
}