import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMetodos";

export default function WidgetSm() {
  const [utilizadores, setUtilizadores] = useState([]);

  useEffect(() => {
    const getUtilizadores = async () => {
      try {
        const res = await userRequest.get("utilizador/?new=true");
        setUtilizadores(res.data);
        console.log(res.data)
      } catch (err){
        console.log(err)
      };
    };
    getUtilizadores();
    console.log(utilizadores );
  }, []);


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Novos clientes!</span>
      <ul className="widgetSmList">
      { 
        utilizadores.utilizador?.map((utilizador) => (
          <li className="widgetSmListItem" key={utilizador._id}>
            <img
              src={
                utilizador.img ||
                "https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/utilizador%20icon.png?alt=media&token=42996bbc-ae44-4cc1-9e3e-4e325df9cd2a"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{utilizador.nome}</span>
            </div>

          </li>
        ))
      }
      </ul>
    </div>
  );
}