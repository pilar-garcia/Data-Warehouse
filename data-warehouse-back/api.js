const express = require('express');
const cors = require('cors')
const app = express();

const {
    validateUserData,
    validateRegionData,
    validateCountryData,
    validateCityData,
    validacionJWT,
    validacionJWTAdmin,
  } = require("./middlewares");
  const { createUser, login, getUser } = require("./userController");
  const { createRegion, getRegion, getRegions, updateRegion, deleteRegion } = require("./RegionController");
  const { createCountry, getCountry, updateCountry} = require("./CountryController");
  const { createCity, getCity, updateCity} = require("./CityController");
  
  app.use(express.json());
  app.use(cors());

  app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
  });

// Create routes//

// USERS
app.post("/users", validateUserData, createUser); // CREATE USER
app.post("/users/login", login); // LOGIN USER
app.get("/usuarios/:userId", validacionJWT, getUser); // LISTAR DATOS DE UN USUARIO ESPECIFICO

// CONTACTS
app.post("/contacts", validateRegionData, validacionJWTAdmin, createRegion); // CREATE RegionS
app.get("/contacts", validacionJWT, getRegions); // GET ALL RegionS
app.get("/contacts/:contactId", validacionJWT, getRegion); // FIND Region BY ID
app.patch("/contacts/:contactId", validacionJWTAdmin, updateRegion); // UPDATE Region
app.delete("/contact/:contactId", validacionJWTAdmin, deleteRegion); // DELETE Region

// Regions
app.post("/regions", validateRegionData, validacionJWT, createRegion); // CREATE Region
app.get("/regions/:regionId", validacionJWT, getRegion); // GET Region
app.get("/regions", validacionJWT, getRegions); // List Regions
app.patch("/regions/:regionId", validacionJWTAdmin, updateRegion); // UPDATE Region
// Country
app.post("/countries", validateCountryData, validacionJWT, createCountry); // CREATE ORDER
app.get("/countries/:countryId", validacionJWT, getCountry); // GET ORDER
app.patch("/countries/:countryId", validacionJWTAdmin, updateCountry); // UPDATE ORDER
// Cities
app.post("/cities", validateCityData, validacionJWT, createCity); // CREATE ORDER
app.get("/cities/:cityId", validacionJWT, getCity); // GET ORDER
app.patch("/cities/:cityId", validacionJWTAdmin, updateCity); // UPDATE ORDER

/*
// COMPANIES
app.post("/companies", validateOrderData, validacionJWT, createOrder); // CREATE ORDER
app.get("/companies/:companyId", validacionJWT, getOrder); // GET ORDER
app.patch("/companies/:companyId", validacionJWTAdmin, updateOrder); // UPDATE ORDER
*/