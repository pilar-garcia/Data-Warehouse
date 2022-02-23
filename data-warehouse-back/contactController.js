const sequelize = require('./models')

module.exports = {
    createContact: (req, res) => {
        try {
            let contactToSave = req.body;
            let channels = contactToSave.channels;
            const contact =  sequelize.models.Contact.build(
                { name: contactToSave.name, lastName: contactToSave.lastName, position: contactToSave.position,
                     address: contactToSave.address, cityId: contactToSave.cityId, email: contactToSave.email,
                     photo: contactToSave.photo,
                     interes: contactToSave.interes, companyId: contactToSave.companyId });
            contact.save().then((contactSaved) => {
                let promisesItem = [];
                channels.forEach(channelToSave => {
                    let promiseItem = new Promise((resolve, reject) => {
                        const channel =  sequelize.models.Channel.build({ name: channelToSave.name,
                            value: channelToSave.value, preference: channelToSave.preference, contactId: contactSaved.id });
                        channel.save().then((channelSaved) => {  
                            resolve(channelSaved);
                        }).catch((error)=>{
                            console.error('error adding channel', error);
                            reject(error);
                        });
                    });     
                    promisesItem.push(promiseItem);
                });

                Promise.all(promisesItem).then(values=>{
                    contactSaved.channels = values;
                    res.status(200).json(contactSaved);
                }).catch((error)=>{
                    console.error('Unable to connect to the database:', error);
                    res.status(400).json(error);
                });

            }).catch((error)=>{
                res.status(400).json(error);
                console.error('Unable to connect to the database:', error);
            })
        }catch (error) {
            res.status(400).json(error);
            console.error('Unable to connect to the database:', error);
        }
    },
    getContact: (req, res) => {
        try {
            let contactId = req.params.ContactId;
            
            sequelize.models.Contact.findOne({ where: { id: contactId }, include: [ { model: sequelize.models.Country, as: 'Country' } ] }).then((Contact) => {
              res.status(200).json(Contact);
            }).catch((error)=>{
              res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    getContacts: (req, res) => {
        try {
            sequelize.models.Contact.findAll({include: [ {model: sequelize.models.City}, {
                model: sequelize.models.Channel}, {model: sequelize.models.Company} ]}).then((Contacts) => {
                res.status(200).json(Contacts);
            }).catch((error)=>{
                res.status(400).json(error);
            });
              
          } catch (error) {
              res.status(400).json(error);
              console.error('Unable to connect to the database:', error);
          }
    },
    updateContact: (req, res) => {
        try {
            let contactId = req.params.ContactId;
            let contactToUpdate = req.body;
            
            sequelize.models.Contact.findByPk(contactId).then((contact) => {
                contact.name = contactToUpdate.name;
                contact.lastName = contactToUpdate.lastName;
                contact.email = contactToUpdate.email;
                contact.address = contactToUpdate.address;
                contact.position = contactToUpdate.position;
                contact.interes = contactToUpdate.interes;
                contact.photo = contactToUpdate.photo;

              // actualiza contact
              contact.save().then((updatedContact) => {
                
                let promisesItem = [];
                //product plus others product  result the sum of amounts by price and total
                contactToUpdate.channels.forEach(itemToSave => {
                    let promiseItem = new Promise((resolve, reject) => {
                            sequelize.models.Item.findOrCreate({
                                where: { contactId: contactToUpdate.id, name: itemToSave.name },
                                defaults: {
                                  contactId: contactToUpdate.id,
                                  name: itemToSave.name,
                                  value: itemToSave.value,
                                  preference: itemToSave.preference,
                                }
                            }).then(item=>{
                                let foundItem = item[0];
                                foundItem.value = itemToSave.value;
                                foundItem.preference = itemToSave.preference;
                                foundItem.save().then(updatedItem=>{
                                    resolve(updatedItem);
                                }).catch((error)=>{
                                    console.error('Error updating item', error);
                                    reject(error);
                                });
                            }).catch((error)=>{
                              console.error('Error finding item', error);
                              reject(error);
                            });
                    });
                    promisesItem.push(promiseItem);
                });
                
                    Promise.all(promisesItem).then(values=>{
                        res.status(200).json(updatedContact);
                    }).catch((error)=>{
                        console.error('Unable to connect to the database:', error);
                        res.status(400).json(error);
                    });
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
    deleteContact: (req, res) => {
        try {
            let contactId = req.params.ContactId;
           
            sequelize.models.Contact.findByPk(ContactId).then((Contact) => {
              
                // delete la orden
                contact.status = 'INACTIVE';
                contact.save().then((ContactDeleted) => {
                    res.status(200).json(ContactDeleted);
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