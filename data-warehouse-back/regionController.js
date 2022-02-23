const sequelize = require('./models')

module.exports = {
    createRegion: (req, res) => {
        try {
            let regionToSave = req.body;
            const region =  sequelize.models.Region.build({ name: regionToSave.name });
            region.save().then((Region) => {
            res.status(200).json(Region);
            }).catch((error)=>{
                res.status(400).json(error);
                console.error('Unable to connect to the database:', error);
            })
        }catch (error) {
            res.status(400).json(error);
            console.error('Unable to connect to the database:', error);
        }
    },
    getRegion: (req, res) => {
        try {
            let regionId = req.params.regionId;
            
            sequelize.models.Region.findOne({ where: { id: regionId } }).then((region) => {
              res.status(200).json(region);
            }).catch((error)=>{
              res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    getRegions: (req, res) => {
        try {
            sequelize.models.Region.findAll().then((regions) => {
                res.status(200).json(regions);
            }).catch((error)=>{
                res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    updateRegion: (req, res) => {
        try {
            let regionId = req.params.regionId;
            let regionToUpdate = req.body;
            
            sequelize.models.Region.findByPk(regionId).then((region) => {
                region.name = regionToUpdate.name;
                region.price = regionToUpdate.price;
                region.imgUrl = regionToUpdate.imgUrl;
             

              // actualiza region
              region.save().then((updatedregion) => {
                
                res.status(200).json(updatedregion);
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
    deleteRegion: (req, res) => {
        try {
            let regionId = req.params.regionId;
           
            sequelize.models.Region.findByPk(regionId).then((region) => {
              
                // delete la orden
                region.status = 'INACTIVE';
                region.save().then((regionDeleted) => {
                    res.status(200).json(regionDeleted);
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