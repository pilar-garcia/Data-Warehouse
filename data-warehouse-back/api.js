

var express = require('express');
var app = express();

const {
    validateUserData,
    validateProductData,
    validateOrderData,
    validacionJWT,
    validacionJWTAdmin,
  } = require("./middlewares");
  const { createUser, login, getUser } = require("./userController");
  const { createProduct, getProduct, getProducts, updateProduct, deleteProduct } = require("./productController");
  const { createOrder, getOrder, updateOrder } = require("./orderController");
  
  app.use(express.json());
  
  app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
  });

// Create routes//

// USERS
app.post("/users", validateUserData, createUser); // CREATE USER
app.post("/users/login", login); // LOGIN USER
app.get("/usuarios/:userId", validacionJWT, getUser); // LISTAR DATOS DE UN USUARIO ESPECIFICO

// CONTACTS
app.post("/contacts", validateProductData, validacionJWTAdmin, createProduct); // CREATE PRODUCTS
app.get("/contacts", validacionJWT, getProducts); // GET ALL PRODUCTS
app.get("/contacts/:contactId", validacionJWT, getProduct); // FIND PRODUCT BY ID
app.patch("/contacts/:contactId", validacionJWTAdmin, updateProduct); // UPDATE PRODUCT
app.delete("/contact/:contactId", validacionJWTAdmin, deleteProduct); // DELETE PRODUCT

// COMPANIES
app.post("/companies", validateOrderData, validacionJWT, createOrder); // CREATE ORDER
app.get("/companies/:companyId", validacionJWT, getOrder); // GET ORDER
app.patch("/companies/:companyId", validacionJWTAdmin, updateOrder); // UPDATE ORDER

// Regions
app.post("/regions", validateOrderData, validacionJWT, createOrder); // CREATE ORDER
app.get("/regions/:regionId", validacionJWT, getOrder); // GET ORDER
app.patch("/regions/:regionId", validacionJWTAdmin, updateOrder); // UPDATE ORDER
// Country
app.post("/countries", validateOrderData, validacionJWT, createOrder); // CREATE ORDER
app.get("/countries/:countryId", validacionJWT, getOrder); // GET ORDER
app.patch("/countries/:countryId", validacionJWTAdmin, updateOrder); // UPDATE ORDER
// Cities
app.post("/cities", validateOrderData, validacionJWT, createOrder); // CREATE ORDER
app.get("/cities/:cityId", validacionJWT, getOrder); // GET ORDER
app.patch("/cities/:cityId", validacionJWTAdmin, updateOrder); // UPDATE ORDER