import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiChamadas";

import { useHistory } from "react-router-dom";



const Login = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.utilizador); // loja.js
  const history = useHistory();
  const navegarPara = () => history.push('/adminHome');

  const gerirClique = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    navegarPara();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
     
      <button onClick={gerirClique} style={{ padding: 10, width:100 }} disabled={isFetching}>
       LOGIN      
      </button>
     

          {//error && <div style={{color: "#FF0000" }}>Algo deu errado...</div>
}
    </div>
    
  );
};

export default Login;