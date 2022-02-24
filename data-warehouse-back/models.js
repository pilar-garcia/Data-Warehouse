const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('mysql://admin:datawarehouse@localhost:3306/datawarehouse')

class City extends Model {}

City.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'City' // We need to choose the model name
});

class Country extends Model {}

Country.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Country' // We need to choose the model name
});

class Region extends Model {}

Region.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Region' // We need to choose the model name
});


class Users extends Model {}

Users.init({
  userId: {
    type: Sequelize.INTEGER,
    allowNull:false,
    primaryKey: true,
    autoIncrement: true,
},
userLogin: {
    type: DataTypes.STRING,
    allowNull:false
},
userName: {
    type: DataTypes.STRING,
    allowNull:false
},
userLastName: {
    type: DataTypes.STRING,
    allowNull:false
},
userPassword: {
    type: DataTypes.STRING,
    allowNull:false
},
userEmail: {
    type: DataTypes.STRING,
    allowNull:false
},
userAdminFlag: {
    type: DataTypes.INTEGER,
    allowNull:false
}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Users' // We need to choose the model name
});

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
     type: DataTypes.STRING,
     allowNull: false   
  },
  pass: {
     type: DataTypes.STRING,
     allowNull: false   
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});


class Rol extends Model {}

Rol.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Rol' // We need to choose the model name
  });

  
class Company extends Model {}

Company.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Company' // We need to choose the model name
  });

  class Contact extends Model {}

Contact.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    interes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Contact' // We need to choose the model name
  });

  class Channel extends Model {}

Channel.init({
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preference: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Channel' // We need to choose the model name
  });

  
Region.hasMany(Country, {
  foreignKey: 'regionId'
});

Country.hasMany(City, {
  foreignKey: 'countryId'
});

Country.hasMany(Company, {
  foreignKey: 'countryId'
});

Company.belongsTo(City, {
  foreignKey: 'cityId'
});

Contact.belongsTo(City, {
  foreignKey: 'cityId'
});

Contact.belongsTo(Company, {
  foreignKey: 'companyId'
});   

Contact.hasMany(Channel, {
foreignKey: 'contactId'
}) 

User.belongsTo(Rol, {
  foreignKey: 'rolId'
});


Region.sync();
Country.sync();
City.sync();
Company.sync();
Contact.sync();
Channel.sync();

Rol.sync().then(result=>{
  Rol.findOrCreate({
    where: { name: 'ADMIN' },
    defaults: {
      name: 'ADMIN'
    }
  });
  Rol.findOrCreate({
    where: { name: 'CLIENT' },
    defaults: {
      name: 'CLIENT'
    }
  });
}).catch((error)=>{
  console.error('Error', error);
});

User.sync().then(result=>{
  User.findOrCreate({
    where: { email: 'admin@admin.co' },
    defaults: {
      name: 'admin',
      lastName: 'administrator',
      email: 'admin@admin.co',
      pass: 'admin',
      rolId: '1'
    }
  });
}).catch((error)=>{
  console.error('Error', error);
});

module.exports = sequelize;