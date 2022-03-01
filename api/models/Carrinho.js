const mongoose = require("mongoose")


const CarrinhoSchema = new mongoose.Schema(

  {

    IdUtilizador: { type:String, required:true, unique:true},
    produtos:[
      {
        IdProduto:{
          type:String
        },
        quantidade:{
          type:Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true}
);

module.exports = mongoose.model("Carrinho", CarrinhoSchema);