import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { useSelector } from "react-redux";
import {format} from "timeago.js"

export default function User() {
  const location = useLocation();
  const utilizadorID = location.pathname.split("/")[2];
  const utilizadorAtual = useSelector((state) =>
  state.utilizador.utilizadores.utilizador.find((utilizador) => utilizador._id === utilizadorID)
);
console.log(utilizadorAtual)

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Utilizador</h1>
        <Link to="/adminNovoUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">

            <div className="userShowTopTitle">
              <span className="userShowUsername">{utilizadorAtual.nome}</span>
              <span className="userShowUserTitle">Utilizador BabyConcept</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Detalhes da conta</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Nome completo - {utilizadorAtual.nome}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Membro desde - {format(utilizadorAtual.createdAt)}</span>
            </div>
            <span className="userShowTitle">Detalhes de Contacto</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">Telemóvel - {utilizadorAtual.telefone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">E-mail - {utilizadorAtual.email}</span>
            </div>

          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Editar</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">

              <div className="userUpdateItem">
                <label>Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ainda não funcional"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Ainda não funcional"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>

            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">

          
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
