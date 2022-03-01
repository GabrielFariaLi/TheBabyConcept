const Pedido = require("../models/Pedido");
const {
  verificacaoToken,
  verificacaoTokenAutorizacao,
  verificacaoTokenAdmin,
} = require("./verificacaoToken");

const router = require("express").Router();

//CREATE

router.post("/", verificacaoToken, async (req, res) => {
  const novoPedido = new Pedido(req.body);

  try {
    const PedidoSalvo = await novoPedido.save();
    res.status(200).json(PedidoSalvo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verificacaoTokenAdmin, async (req, res) => {
  try {
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(pedidoAtualizado);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ESTADO DO PEDIDO
router.put("/atualizarEstado/:id", verificacaoTokenAdmin, async (req, res) => {
  try {
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      {
        estado: req.body.estado,
      },
      { new: true }
    );
    res.status(200).json(pedidoAtualizado);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verificacaoTokenAdmin, async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.status(200).json("Pedido foi deletado...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/buscar/:IdUtilizador", verificacaoToken, async (req, res) => {
  try {
    const pedidos = await Pedido.find({ IdUtilizador: req.params.IdUtilizador });
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PEDIDO POR ID
router.get("/buscarPedidoId/:id", async (req, res) => {
  try {
    const pedidos = await Pedido.findById(req.params.id);
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verificacaoTokenAdmin, async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/rendaMensal", verificacaoTokenAdmin, async (req, res) => {
  const IdProduto = req.query.pid;
  const date = new Date();
  const ultimoMes = new Date(date.setMonth(date.getMonth() - 1));
  const penultimoMes = new Date(new Date().setMonth(ultimoMes.getMonth() - 1));

  try {
    const rendaMensal = await Pedido.aggregate([
      {
        $match: {
          createdAt: { $gte: penultimoMes },
          ...(IdProduto && {
            produtos: { $elemMatch: { IdProduto } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalCompra",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(rendaMensal);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;