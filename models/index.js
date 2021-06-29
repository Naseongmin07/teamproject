'use strict';

const fs = require('fs');
const path = require('path');
const { mainModule } = require('process');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Adminlist = require('./adminlist.js')
const Community = require('./community.js')
const Course = require('./course.js')
const Employed = require('./employed')
//const Main = require('./main.js')
const Portfolio = require('./portfolio.js')
const Submain = require('./submain.js')
const User = require('./user.js')
const Facility = require('./facility.js')
const Mainvisual = require('./mainvisual')
const Visitor = require('./visitor')
const Siteset = require('./siteset.js')
const Coinfo = require('./company_info.js')
const Main = require('./main.js')
const Popup = require('./popup.js')
 
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Adminlist = Adminlist
db.Community = Community
db.Course = Course
db.Employed = Employed
//db.Main = Main
db.Portfolio = Portfolio
db.Submain = Submain
db.User = User
db.Facility = Facility
db.Mainvisual = Mainvisual
db.Visitor = Visitor
db.Siteset = Siteset
db.Coinfo = Coinfo
db.Main = Main
db.Popup = Popup

Popup.init(sequelize)
Adminlist.init(sequelize)
Community.init(sequelize)
Course.init(sequelize)
Employed.init(sequelize)
//Main.init(sequelize)
Portfolio.init(sequelize)
Submain.init(sequelize)
User.init(sequelize)
Facility.init(sequelize)
Mainvisual.init(sequelize)
Visitor.init(sequelize)
Siteset.init(sequelize)
Coinfo.init(sequelize)
Main.init(sequelize)

// Adminlist.associate(db)
// Community.associate(db)







db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
