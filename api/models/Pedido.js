const mongoose = require("mongoose")


const PedidoSchema = new mongoose.Schema(

  {

    IdUtilizador: { type:String, required:true},
    produtos:[
      {
        IdProduto:{
          type:String
        },
        quantidade:{
          type:Number,
          default: 1,
        },
        imgProduto:{
          type: String,
          default: "Vazio",
        },
        tituloProduto:{
          type:String
        },
        tamanho:{
          type:Array
        },
        cor:{
          type:Array
        },

      },
    ],
    totalCompra: {type:Number, required:true},
    endereco:{type:Object, required:true},
    estado:{ type:String, default: "Pendente"},
  },
  { timestamps: true}
);

module.exports = mongoose.model("Pedido", PedidoSchema);