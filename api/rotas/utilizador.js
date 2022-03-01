const Utilizador = require("../models/Utilizador");
const { verificacaoToken,
        verificacaoTokenAutorizacao,
        verificacaoTokenAdmin } = require("./verificacaoToken");
const CryptoJS = require("crypto-js");
const router = require("express").Router();


router.put("/:id", verificacaoToken, async (req,res)=>{
  if(req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC_HASH
    ).toString();
  }

  try {
    const utilizadorAtualizado = await Utilizador.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },{new:true}
    );
    res.status(200).json(utilizadorAtualizado);
  }catch(err){
    res.status(500).json(err);
  }
  
});

// DELETE

router.delete("/:id", verificacaoToken, async (req,res) => {
  try{
    await Utilizador.findByIdAndDelete(req.params.id);
    res.status(200).json("Utilizador foi deletado com sucesso!");
  } catch(err){
    res.status(500).json(err)
  }
});

// GET UTILIZADOR

router.get("/buscar/:id", verificacaoToken, async (req,res) => {
  try{
    const utilizador = await Utilizador.findById(req.params.id);
    const { password, ...others } = utilizador._doc;  
    res.status(200).json({others});
  } catch(err){
    res.status(500).json(err)
  }
});

// GET TODOS OS UTILIZADOR

router.get("/", verificacaoTokenAdmin, async (req,res) => {
  const query = req.query.new;

  try{
    const utilizador = query 
    ?  await Utilizador.find().sort({_id: -1}).limit(5) 
    : await Utilizador.find();
    //const { password, ...others } = utilizador._doc;  
    res.status(200).json({utilizador});
  } catch(err){
    res.status(500).json(err)
  }
});


// GET UILIZADOR STATUS

router.get("/stats", verificacaoTokenAdmin, async (req, res) => {
  const date = new Date();
  const ultimoAno = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Utilizador.aggregate([
      { $match: { createdAt: { $gte: ultimoAno } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router