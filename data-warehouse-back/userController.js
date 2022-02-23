const sequelize = require('./models')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: (req, res) => {
      try {
        let userToSave = req.body;
        const user =  sequelize.models.User.build({ name: userToSave.name, lastName: userToSave.lastName,
          email: userToSave.email, pass: userToSave.pass, rolId: userToSave.rolId });
        user.save().then((userSaved) => {
          res.status(200).json(userSaved);
        }).catch((error)=>{
          res.status(400).json(error.errors[0].message);
          console.error('Unable to connect to the database:', error);
        });
      } catch (error) {
        res.status(400).json(error.errors[0].message);
        console.error('Unable to connect to the database:', error);
      }
    },
    login: (req, res) => {
      try {
        let userToAuthenticate = req.body;
        sequelize.models.User.findOne({ where: { email: userToAuthenticate.email } }).then((user) => {
          // Verificar contra
          if (user.pass == userToAuthenticate.pass){
            
            // Generar token de autenticacion
            let authentication = {
              fullName: user.name + ' ' + user.lastName,
              id: user.id,
              admin: user.rolId == 1
            };
            const token = jwt.sign(authentication, 'secret', {
                expiresIn: '2h'
            });
            console.log(authentication.admin, "admin");
            res.status(200).header('Authorization', token).json({
              data: `Welcome ${authentication.fullName}`,
              token,
              admin: authentication.admin
            });
          } else {
            res.status(401).json({ error: 'Verify credetials'});
          }
        }).catch((error)=>{
          console.log(error);
          res.status(400).json(error);
        });
        
      } catch (error) {
        res.status(400).json(error);
        console.error('Unable to connect to the database:', error);
      }
    },
    getUser: (req, res) => {
      try {
        let userId = req.params.userId;
        console.log(userId);
        sequelize.models.User.findByPk(userId).then((user) => {
          
          res.status(200).json(user);
        }).catch((error)=>{
          res.status(400).json(error);
        });
        
      } catch (error) {
        res.status(400).json(error);
        console.error('Unable to connect to the database:', error);
      }
    },
    getUsers: (req, res) => {
      try {
        sequelize.models.User.findAll({include: [ { model: sequelize.models.Rol} ]}).then((users) => {
          res.status(200).json(users);
      }).catch((error)=>{
          res.status(400).json(error);
      });
        
    } catch (error) {
        res.status(400).json(error);
        console.error('Unable to connect to the database:', error);
    }
    }
  };