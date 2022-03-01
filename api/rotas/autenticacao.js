const router = require("express").Router();
const UtilizadorModel = require("../models/Utilizador");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");


dotenv.config();

// REGISTRAR
router.post("/registrar", async (req,res) => {
  const novoUtilizador = new UtilizadorModel({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC_HASH
    ).toString(),
  });
  try{
  const utilizadorRegistrado = await novoUtilizador.save();
  res.status(201).json(utilizadorRegistrado);
  } catch(err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req,res) => {
  try{
    const utilizador = await UtilizadorModel.findOne(
      {
        email: req.body.email
      }
    );

    if (!utilizador){
      res.status(401).json("E-mail incorreto");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      utilizador.password,
      process.env.PASS_SEC_HASH
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;
        
    if (originalPassword != inputPassword){
      res.status(401).json("Senha incorreta");
      return;
    };


    const accessToken = jwt.sign(
      {
          id: utilizador._id,
          isAdmin: utilizador.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"} // UTILIZADOR SÓ PODE USAR ESSE TOKEN POR 3 DIAS E DEVE RELOGAR PARA RENOVA-LO!
      );

      const { password, ...others } = utilizador._doc;  
      res.status(200).json({...others, accessToken});
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;