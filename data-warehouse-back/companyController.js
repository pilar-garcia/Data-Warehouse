const sequelize = require('./models')

module.exports = {
    createCompany: (req, res) => {
        try {
            let companyToSave = req.body;
            const company =  sequelize.models.Company.build({ name: companyToSave.name, address: companyToSave.address, countryId: companyToSave.countryId });
            company.save().then((companySaved) => {
                res.status(200).json(companySaved);
            }).catch((error)=>{
                res.status(400).json(error);
                console.error('Unable to connect to the database:', error);
            })
        }catch (error) {
            res.status(400).json(error);
            console.error('Unable to connect to the database:', error);
        }
    },
    getCompany: (req, res) => {
        try {
            let companyId = req.params.CompanyId;
            
            sequelize.models.Company.findOne({ where: { id: companyId }, include: [ { model: sequelize.models.Country, as: 'Country' } ] }).then((Company) => {
              res.status(200).json(Company);
            }).catch((error)=>{
              res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    getCompanies: (req, res) => {
        try {
            sequelize.models.Company.findAll({include: [ { model: sequelize.models.Country, as: 'Country' } ]}).then((Companys) => {
                res.status(200).json(Companys);
            }).catch((error)=>{
                res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    updateCompany: (req, res) => {
        try {
            let companyId = req.params.CompanyId;
            let companyToUpdate = req.body;
            
            sequelize.models.Company.findByPk(CompanyId).then((Company) => {
                company.name = companyToUpdate.name;
                company.price = companyToUpdate.price;
                company.imgUrl = companyToUpdate.imgUrl;
             

              // actualiza company
              company.save().then((updatedCompany) => {
                
                res.status(200).json(updatedCompany);
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
    deleteCompany: (req, res) => {
        try {
            let companyId = req.params.CompanyId;
           
            sequelize.models.Company.findByPk(CompanyId).then((Company) => {
              
                // delete la orden
                company.status = 'INACTIVE';
                company.save().then((CompanyDeleted) => {
                    res.status(200).json(CompanyDeleted);
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