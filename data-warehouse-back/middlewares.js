const jwt = require("jsonwebtoken");
const tokenKey = "secret";


module.exports = {
  validateUserData: (req, res, next) => {
    if (req.body.userName && req.body.email && req.body.fullName && req.body.phone && req.body.address && req.body.pass) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  },
  validateRegionData: (req, res, next) => {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  },
  validateCountryData: (req, res, next) => {
    if (req.body.name && req.body.regionId) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  },
  validateCompanyData: (req, res, next) => {
    if (req.body.name && req.body.countryId && req.body.address ) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  },
  validateCityData: (req, res, next) => {
    if (req.body.name && req.body.countryId) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  },
  validacionJWT: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const verificarToken = jwt.verify(token, tokenKey);
      if (verificarToken) {
        req.infoToken = verificarToken;
        return next();
      }
    } catch (error) {
      res.status(401).json({"msj":"User unauthorized"});
    }
  },
  validacionJWTAdmin: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const verificarToken = jwt.verify(token, tokenKey);
      console.log(verificarToken);
      if (verificarToken) {
        req.infoToken = verificarToken;
        if (req.infoToken.admin) {
          return next();
        } else {
          res.status(401).json({"msj":"User unauthorized"});
        }
      }
    } catch (error) {
      res.status(401).json({"msj":"unknown error"});
    }
  },
};