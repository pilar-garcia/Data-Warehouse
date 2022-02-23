const sequelize = require('./models')

module.exports = {
    createCity: (req, res) => {
        try {
            let cityToSave = req.body;
            const city =  sequelize.models.City.build({ name: cityToSave.name, countryId: cityToSave.countryId });
            city.save().then((savedCity) => {
                res.status(200).json(savedCity);
            }).catch((error)=>{
                res.status(400).json(error);
                console.error('Unable to connect to the database:', error);
            })
        }catch (error) {
            res.status(400).json(error);
            console.error('Unable to connect to the database:', error);
        }
    },
    getCity: (req, res) => {
        try {
            let cityId = req.params.CityId;
            
            sequelize.models.City.findOne({ where: { id: cityId } }).then((City) => {
              res.status(200).json(City);
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
            sequelize.models.City.findAll().then((countries) => {
                res.status(200).json(countries);
            }).catch((error)=>{
                res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    updateCity: (req, res) => {
        try {
            let cityId = req.params.CityId;
            let cityToUpdate = req.body;
            
            sequelize.models.City.findByPk(CityId).then((City) => {
                city.name = cityToUpdate.name;
                city.price = cityToUpdate.price;
                city.imgUrl = cityToUpdate.imgUrl;
             

              // actualiza city
              city.save().then((updatedCity) => {
                
                res.status(200).json(updatedCity);
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
    deleteCity: (req, res) => {
        try {
            let cityId = req.params.CityId;
           
            sequelize.models.City.findByPk(CityId).then((City) => {
              
                // delete la orden
                city.status = 'INACTIVE';
                city.save().then((CityDeleted) => {
                    res.status(200).json(CityDeleted);
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