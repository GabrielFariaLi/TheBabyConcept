import "./transacaoList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Visibility } from "@material-ui/icons";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransacao, getTransacoes } from "../../redux/apiChamadas";

import { userRequest, publicRequest } from "../../requestMetodos";


export default function TransacaoList() {

  
  const [pedidos, setPedidos] = useState([]);

  
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
    const getPedidos = async ()=> {
      try{
        const res = await userRequest.get("/pedido");
        setPedidos(res.data);
        console.log(pedidos)
      } catch(err) {}
    };
    getPedidos()
  }, []) // dependencias

  const gerirDelete = (id) => {
    const resultado = window.confirm('Tem certeza que deseja remover este pedido?');
    if(resultado == true){
      const res =  userRequest.delete(`/pedido/${id}`);

    }
 
  };

  const columns = [
    { field: "_id", headerName: "ID Encomenda", width: 220 },
    { field: "IdUtilizador", headerName: "ID do Comprador", width: 200 },
    /*{
      field: "produtos",
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
    },*/
    { field: "endereco", headerName: "País para entrega", width: 200,
      renderCell: (params => {
        return ( <div>{params.row.endereco.country}</div>);
      }) },
    { field: "estado", headerName: "Estado da Transação", width: 200 },
    {
      field: "totalCompra",
      headerName: "Total da Compra",
      width: 160,
    },
    {
      field: "acao",
      headerName: "Ações",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminTransacao/" + params.row._id}>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Visualizar Pedido
            </button>
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
      <DataGrid
        rows={pedidos}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      {console.log(pedidos)}
    </div>
  );
}