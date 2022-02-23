const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('mysql://admin:delilah@localhost:3306/delilah')

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



class Companies extends Model {}

Companies.init({
  // Model attributes are defined here
  companyId: {
    type: Sequelize.INTEGER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },companyEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },companyPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },cityId: {
      type: DataTypes.STRING,
      references: {
        model: Cities,
        key:'cityId'
      }
    },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Companies' // We need to choose the model name
  });


class Contact extends Model {}

Contact.init({
  // Model attributes are defined here
  contactId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  contactName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactLastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactCharge: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyId:{
    type: DataTypes.INTEGER,
    references: {
      model:Companies,
      key:'companyId'
    }
  },
  regionId:{
    type: DataTypes.INTEGER,
    references: {
      model:Regions,
      key:'regionId'
    }
  },
  countryId:{
    type: DataTypes.INTEGER,
    references: {
      model:countries,
      key:'countryId'
    }
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
        model:City,
        key:'city_id'
    }        
},
contactAddress: {
    type: DataTypes.STRING,
    allowNull:false
},
contactInterest: {
    type: DataTypes.INTEGER,
    allowNull:false
}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Contact' // We need to choose the model name
});

class Channel extends Model {}

Channel.init({
  // Model attributes are defined here
  channelId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  channelName: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  channelAccount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  channelPreferences: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contactId: {
    type: DataTypes.INTEGER,
    references: {
        model:Contact,
        key:'contactId'
    }        
}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Channel' // We need to choose the model name
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

Region.hasMany(Country, {
  foreignKey: 'regionId'
});

Country.hasMany(City, {
  foreignKey: 'cityId'
});



module.exports = sequelize;