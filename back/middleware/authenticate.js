'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'a';


exports.auth = function (req, res, next) {
  // console.log(req.headers);

  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'NoHeadersError' });
  }

  //segmenta el token en 3 partes
  var token = req.headers.authorization.replace(/[""]+/g, '');
  var segment = token.split('.');
  //console.log(token);
 // console.log(segment);
  //valida el token si la longitud es distinta a 3
  if (segment.length != 3) {
    return res.status(403).send({ message: 'InvalidTokenDiff3' });
  } else {
    if (segment && token.startsWith('Bearer ')) {
      // Extrae el token eliminando "Bearer " del encabezado
      token = token.substring(7);
    try { //decodifica el token   
      var payload = jwt.decode(token, secret);
      console.log(payload);
      if (payload.exp <= moment.unix()) {//si la fecha expiro
        return res.status(403).send({ message: 'TokenExpirado' });
      }

    } catch (error) {
      //console.log(error);
      return res.status(403).send({ message: "InvalidToken" });
    }
    }
  }
  req.user = payload;

  next();

}

