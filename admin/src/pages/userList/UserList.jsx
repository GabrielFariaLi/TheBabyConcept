import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUtilizador, getUtilizadores } from "../../redux/apiChamadas";

export default function UserList() {
  const dispatch = useDispatch();
  const utilizadores = useSelector((state) => state.utilizador.utilizadores.utilizador);
  console.log(utilizadores)
  
  window.onload = function() {
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }

  useEffect(() => {
    getUtilizadores(dispatch);
  }, [dispatch]);



  const gerirDelete = (id) => {
    const resultado = window.confirm('Tem certeza que deseja remover este utilizador?');
    if(resultado == true){
      deleteUtilizador(id, dispatch);
    }
 
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 230 },

    { field: "email", headerName: "Email", width: 200 },
    {
      field: "telefone",
      headerName: "Telemóvel",
      width: 150,
    },
    {
      field: "isAdmin",
      headerName: "é Administradora?",
      width: 160,
    },    {
      field: "nome",
      headerName: "Nome completo",
      width: 170,

    },
    {
      field: "acao",
      headerName: "Ações",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminUser/" + params.row._id}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => gerirDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      
      <Link class="float"to="/adminNovoUser">
          <button className="addProdutoButton">Criar</button>
        </Link>
      <DataGrid
        rows={utilizadores}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
