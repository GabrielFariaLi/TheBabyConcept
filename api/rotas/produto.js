const Produto = require("../models/Produto");
const { verificacaoToken,
        verificacaoTokenAutorizacao,
        verificacaoTokenAdmin } = require("./verificacaoToken");
const CryptoJS = require("crypto-js");
const router = require("express").Router();

// CRIAR PRODUTO


router.post("/", verificacaoTokenAdmin, async (req, res) => {
  const novoProduto = new Produto(req.body);

  try {
    const produtoSalvo = await novoProduto.save();
    res.status(200).json(produtoSalvo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ATUALIZAR PRODUTO
router.put("/:id", verificacaoTokenAdmin, async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(produtoAtualizado);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ATUALIZAR QUANTIDADE VARIACAO PRODUTO
router.put("/atualizarVariacao/:idVariacao/:quantidade", verificacaoToken,  async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findOneAndUpdate({"variacoes._id": req.params.idVariacao}, {$set: {"variacoes.$.quantidade": req.params.quantidade}});
    res.status(200).json(produtoAtualizado);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verificacaoTokenAdmin, async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.status(200).json("Produto foi deletado com sucesso!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUTO
router.get("/buscar/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET PRODUTO POR PESQUISA
router.get("/pesquisa/:stringPesquisa", async (req, res) => {
  try {
    const produto = await Produto.find(req.params.stringPesquisa);
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET TODOS PRODUTOS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategoria = req.query.categoria;
  const qSubCategoria = req.query.subcategoria
  const qTriCategoria = req.query.tricategoria
  const pesquisaString = req.query.pesquisaString
  const qMarca = req.query.marca
 
  try {
    let produtos;

    if (qNew) {
      produtos = await Produto.find().sort({ createdAt: -1 }).limit(1);
    } else if (pesquisaString) {
      produtos = await Produto.find({
        titulo: {
          $regex: pesquisaString, $options: "i" 
        },
      });

    } else if (qMarca) {
      produtos = await Produto.find({
        marca: {
          $in: [qMarca],
        },
      });

    }else if (qTriCategoria) {
      produtos = await Produto.find({
          categorias: {
            $in: [qCategoria],
        },
        subcategorias: {
          $in: [qSubCategoria],
      },
      tricategorias: {
        $in: [qTriCategoria ],
    },
      });

    }
    else if (qSubCategoria) {
      produtos = await Produto.find({
          categorias: {
            $in: [qCategoria],
        },
        subcategorias: {
          $in: [qSubCategoria],
      },
      });

    }else if (qCategoria) {
      produtos = await Produto.find({
        categorias: {
          $in: [qCategoria],
        },
      });

    }  else {
      produtos = await Produto.find();
    }

    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router