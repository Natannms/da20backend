const jwt = require('jsonwebtoken');
class JWT {
    async verifyJsonWebToken(token) {

        if (!token) {
          return { message: 'Token não fornecido', error:{message:'dont have a token'} };
        }

        try {
          // Verificar e decodificar o token
          const decoded = jwt.verify(token, 'segredo-do-token');

          // Armazenar informações do usuário no objeto de solicitação (req) para uso posterior
          req.user = decoded;

          // Chamar a próxima função do middleware
         return {next:true}
        } catch (err) {
          return { message: 'Token inválido', error:err };
        }
      }
}

module.exports = new JWT();
