const Carrinho = require("../models/Carrinho");
const {
  verificacaoToken,
  verificacaoTokenAutorizacao,
  verificacaoTokenAdmin,
} = require("./verificacaoToken");

const router = require("express").Router();

//CREATE

router.post("/", verificacaoToken, async (req, res) => {
  const novoCarrinho = new Carrinho(req.body);

  try {
    const carrinhoSalvo = await novoCarrinho.save();
    res.status(200).json(carrinhoSalvo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verificacaoTokenAutorizacao, async (req, res) => {
  try {
    const carrinhoAtualizado = await Carrinho.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(carrinhoAtualizado);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verificacaoTokenAutorizacao, async (req, res) => {
  try {
    await Carrinho.findByIdAndDelete(req.params.id);
    res.status(200).json("Carrinho deletado com sucesso!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/buscar/:IdUtilizador", verificacaoTokenAutorizacao, async (req, res) => {
  try {
    const carrinho = await Carrinho.findOne({ IdUtilizador: req.params.IdUtilizador });
    res.status(200).json(carrinho);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verificacaoTokenAdmin, async (req, res) => {
  try {
    const carrinhos = await Carrinho.find();
    res.status(200).json(carrinhos);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;