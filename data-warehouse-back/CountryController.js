const sequelize = require('./models')

module.exports = {
    createCountry: (req, res) => {
        try {
            let countryToSave = req.body;
            const country =  sequelize.models.Country.build({ name: countryToSave.name, regionId: countryToSave.regionId });
            country.save().then((savedCountry) => {
                res.status(200).json(savedCountry);
            }).catch((error)=>{
                res.status(400).json(error);
                console.error('Unable to connect to the database:', error);
            })
        }catch (error) {
            res.status(400).json(error);
            console.error('Unable to connect to the database:', error);
        }
    },
    getCountry: (req, res) => {
        try {
            let countryId = req.params.countryId;
            
            sequelize.models.Country.findOne({ where: { id: countryId } }).then((country) => {
              res.status(200).json(country);
            }).catch((error)=>{
              res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    getCountries: (req, res) => {
        try {
            let regionId = req.params.regionId;
            sequelize.models.Country.findAll({ where: { regionId: regionId } }).then((countries) => {
                res.status(200).json(countries);
            }).catch((error)=>{
                res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    updateCountry: (req, res) => {
        try {
            let countryId = req.params.countryId;
            let countryToUpdate = req.body;
            
            sequelize.models.Country.findByPk(countryId).then((country) => {
                country.name = countryToUpdate.name;
                country.price = countryToUpdate.price;
                country.imgUrl = countryToUpdate.imgUrl;
             

              // actualiza Country
              country.save().then((updatedCountry) => {
                
                res.status(200).json(updatedCountry);
                }).catch((error)=>{
                    res.status(400).json(error);
                    console.error('Unable to connect to the database:', error);
                });
            }).catch((error)=>{
                res.status(400).json(error);
                console.error('Unable to connect to the database:', error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    deleteCountry: (req, res) => {
        try {
            let CountryId = req.params.CountryId;
           
            sequelize.models.Country.findByPk(CountryId).then((Country) => {
              
                // delete la orden
                Country.status = 'INACTIVE';
                Country.save().then((CountryDeleted) => {
                    res.status(200).json(CountryDeleted);
                }).catch((error)=>{
                    res.status(400).json(error);
                    console.error('Unable to connect to the database:', error);
                })
            }).catch((error)=>{
                res.status(400).json(error);
                console.error('Unable to connect to the database:', error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
  };