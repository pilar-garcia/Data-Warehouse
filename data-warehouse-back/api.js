const express = require('express');
const cors = require('cors')
const app = express();

const {
    validateUserData,
    validateRegionData,
    validateCountryData,
    validateCityData,
    validateCompanyData,
    validateContactData,
    validacionJWT,
    validacionJWTAdmin,
  } = require("./middlewares");
  const { createUser, login, getUser, getUsers } = require("./userController");
  const { createRegion, getRegion, getRegions, updateRegion, deleteRegion } = require("./RegionController");
  const { createCountry, getCountry, updateCountry, getCountries, getCountriesByRegion} = require("./CountryController");
  const { createCity, getCity, updateCity, getCities, getCitiesByCountry} = require("./CityController");
  const { createCompany, getCompany, updateCompany, getCompanies} = require("./CompanyController");
  const { createContact, getContact, updateContact, getContacts, deleteContact} = require("./ContactController");
  
  app.use(express.json());
  app.use(cors());

  app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
  });

// Create routes//

// USERS
app.post("/users", validateUserData, createUser); // CREATE USER
app.post("/users/login", login); // LOGIN USER
app.get("/users", getUsers); // LOGIN USER
app.get("/usuarios/:userId", validacionJWT, getUser); // LISTAR DATOS DE UN USUARIO ESPECIFICO

// CONTACTS
app.post("/contacts", validateContactData, validacionJWT, createContact); // CREATE RegionS
app.get("/contacts", validacionJWT, getContacts); // GET ALL RegionS
app.get("/contacts/:contactId", validacionJWT, getContact); // FIND Region BY ID
app.patch("/contacts/:contactId", validacionJWT, updateContact); // UPDATE Region
app.delete("/contact/:contactId", validacionJWT, deleteContact); // DELETE Region

// Regions
app.post("/regions", validateRegionData, validacionJWT, createRegion); // CREATE Region
app.get("/regions/:regionId", validacionJWT, getRegion); // GET Region
app.get("/regions", validacionJWT, getRegions); // List Regions
app.patch("/regions/:regionId", validacionJWTAdmin, updateRegion); // UPDATE Region
// Country
app.post("/countries", validateCountryData, validacionJWT, createCountry); // 
app.get("/countries/:countryId", validacionJWT, getCountry); // 
app.get("/countries", validacionJWT, getCountries); // 
app.get("/regions/:regionId/countries", validacionJWT, getCountriesByRegion); // 
app.patch("/countries/:countryId", validacionJWTAdmin, updateCountry); // 
// Cities
app.post("/cities", validateCityData, validacionJWT, createCity); // 
app.get("/cities/:cityId", validacionJWT, getCity); // 
app.get("/cities", validacionJWT, getCities); // 
app.get("/countries/:countryId/cities", validacionJWT, getCitiesByCountry); // 
app.patch("/cities/:cityId", validacionJWTAdmin, updateCity); // 


// COMPANIES
app.post("/companies", validateCompanyData, validacionJWT, createCompany); // 
app.get("/companies/:companyId", validacionJWT, getCompany); // 
app.get("/companies", validacionJWT, getCompanies); // 
app.patch("/companies/:companyId", validacionJWTAdmin, updateCompany); // 
