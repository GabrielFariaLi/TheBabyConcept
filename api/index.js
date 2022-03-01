const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const utilizadorRota = require("./rotas/utilizador");
const autenticacaoRota = require("./rotas/autenticacao");
const produtoRota = require("./rotas/produto");
const carrinhoRota = require("./rotas/carrinho");
const pedidoRota = require("./rotas/pedido");
const stripeRota = require("./rotas/stripe");
const cors = require("cors");




mongoose.connect(process.env.MONGO_CONEXAO_URL)
  .then(() =>console.log("Conexão com a bd sucedida"))
  .catch((err) => {
    console.log(err)
  });

/* // No CORS Headder set
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/message.json');
});

// CORS header `Access-Control-Allow-Origin` set to accept all
app.get('/allow-cors', function(request, response) {
  response.set('Access-Control-Allow-Origin', '*');
  response.sendFile(__dirname + '/message.json');
});*/

//"app.use(cors(http://153.92.221.32));"
app.use(cors());
app.use(express.json());
app.use("/api/autenticacao", autenticacaoRota);
app.use("/api/utilizador", utilizadorRota);
app.use("/api/produto", produtoRota);
app.use("/api/carrinho", carrinhoRota);
app.use("/api/pedido", pedidoRota);
app.use("/api/checkout", stripeRota);



app.listen(process.env.PORT || 5000, ()=> {
  console.log("Backend server está em funcionamento! na porta de numero " + process.env.PORT)
});