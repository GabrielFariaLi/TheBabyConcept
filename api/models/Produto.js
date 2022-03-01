const mongoose = require("mongoose")


const ProdutoSchema = new mongoose.Schema(

  {

    titulo: { type:String, required:true, unique:true},
    desc:{ type:String, required:true},
    img:{ type:String, required:true},
    categorias:{ type: Array }, /* Menino, Menina, Cerimonia */
    subcategorias:{ type: Array }, /* Recém Nascido, Bebé, Criança , Cerimonia Bebé, Cerimonia Junior */
    tricategorias:{ type: Array}, /* todas as ultimas categorias especifi
    cas em cada uma das subcategorias */
    variacoes: [{
      tamanho: { type: String },
      cor: { type: String },
      quantidade: { type: Number, default: 1}
    }],

    precoAntigo: { type:Number},
    marca: { type: String},
    preco: { type:Number, required:true},
    emEstoque: { type:Boolean, default: true},
    createdAt: Date

  },
  { timestamps: true}
);

module.exports = mongoose.model("Produto", ProdutoSchema);