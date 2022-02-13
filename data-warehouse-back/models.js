const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('mysql://admin:delilah@localhost:3306/delilah')

class Cities extends Model {}

Cities.init({
  // Model attributes are defined here
  cityId: {
    type: Sequelize.INTEGER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    },
  cityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryId: {
    type: DataTypes.STRING,
    references: {
      model: countries,
      key:'countryId'
    }
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Cities' // We need to choose the model name
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

class Countries extends Model {}

Countries.init({
  // Model attributes are defined here
  countryId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  countryName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  regionId: {
    type: DataTypes.INTEGER,
    references: {
        model:Regions,
        key:'regionId'
    }        
}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Countries' // We need to choose the model name
});

class Regions extends Model {} 

Regions.init({
  // Model attributes are defined here
  regionId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true,
    },
  regionName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Regions' // We need to choose the model name
});

Countries.hasMany(Regions, {
  foreignKey: 'countryId'
});
Cities.belongsTo(Countries, {
  foreignKey: 'cityId'
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

module.exports = sequelize;