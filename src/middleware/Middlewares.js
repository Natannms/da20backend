const JWT = require("./JWT");

class Middlewares {
  static async init(req, res, next) {
    const isJwTValid = await JWT.verifyJsonWebToken(req.headers.authorization);
    // if(isJwTValid.error){
    //     res.send({error:isJwTValid.message})
    // }
    next()
  }
}

module.exports = Middlewares;
