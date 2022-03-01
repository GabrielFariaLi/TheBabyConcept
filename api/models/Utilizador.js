const mongoose = require("mongoose")

const UtilizadorSchema = new mongoose.Schema(

  {

    nome: { type:String, required:true},
    email:{ type:String, required:true, unique:true},
    password:{ type:String, required:true},
    telefone:{ type:String, required:true},
    endereco:{type:String},
    isAdmin:{
      type: Boolean,
      default: false,
    },
    img:{ type:String },
  },
  { timestamps: true}
);

module.exports = mongoose.model("Utilizador", UtilizadorSchema);