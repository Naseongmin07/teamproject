
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const User = require('./user')
const Test = require('./test')

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User
db.Test = Test

Test.init(sequelize)
User.init(sequelize)

//User.associate(db)


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


console.log(db.Test)
