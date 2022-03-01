const jwt = require("jsonwebtoken");


const verificacaoToken = (req, res, next) => {
  const authHeader = req.headers.token;
 
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token não é valido2");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Você não está autenticado2");
  }
};

const verificacaoTokenAutorizacao = (req,res,next) => {
  verificacaoToken(req,res, ()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else {
      res.status(403).json("Você não tem permissão para fazer isso! aut")
    }
  });
};

const verificacaoTokenAdmin = (req,res,next) => {
  verificacaoToken(req,res, ()=>{
    if(req.user.isAdmin){
      next();
    }else {
      res.status(403).json("Você não tem permissão para fazer isso!")
    }
  })
}

module.exports = {verificacaoToken, verificacaoTokenAutorizacao, verificacaoTokenAdmin}