import { useEffect, useState } from "react";
import { userRequest } from "../../requestMetodos";
import "./widgetLg.css";
import {format} from "timeago.js"

export default function WidgetLg() {
  const [pedido, setPedidos] = useState([]);

  useEffect(() => {
    const getPedidos = async () => {
      try {
        const res = await userRequest.get("pedido");
        setPedidos(res.data);
        console.log(res.data)
      } catch (err){
        console.log(err)
      };
    };
    getPedidos();
    console.log(pedido);
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Ultimas Transações</h3>
      <table className="widgetLgTable">
        <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">ID do Cliente</th>
          <th className="widgetLgTh">Data</th>
          <th className="widgetLgTh">Total da Compra</th>
          <th className="widgetLgTh">Estado</th>
        </tr>
        {pedido?.map((pedidos) => (
          <tr className="widgetLgTr" key={pedidos._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{pedidos.IdUtilizador}</span>
            </td>
            <td className="widgetLgDate">{format(pedidos.createdAt)}</td>
            <td className="widgetLgAmount">${pedidos.totalCompra}</td>
            <td className="widgetLgStatus">
              <Button type={pedidos.estado} />                              
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}