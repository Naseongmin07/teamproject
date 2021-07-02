const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userName:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            userIdx:{
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
            userPsw:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            courseName:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            paycheck:{
                type:Sequelize.STRING(5),
                allowNull:false,
                defaultValue:0
            },
            userBirth:{
                type:Sequelize.DATE,
                allowNull:false,
                get: function(){
                    return moment(this.getDataValue('userBirth')).format('YYYY-MM-DD')
                }
            },
            created_at:{
                allowNull:false,
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('created_at')).format('YYYY-MM-DD')
                }
            },
            userTel:{
                allowNull:false,
                unique:true,
                type:Sequelize.STRING(30)
            },
            userImg:{
                type:Sequelize.TEXT,
                allowNull:true
            },
            userEtc:{
                type:Sequelize.TEXT,
                allowNull:true
            },
            userAddress:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
            employmentStatus:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    static associate(db){
        db.User.hasMany(db.portfolio,{foreignKey:'userIdx',sourceKey:'userIdx'})
        db.User.belongsTo(db.Course,{foreignKey:'courseName',sourceKey:'courseName'})
        db.User.belongsTo(db.Employed,{foreignKey:'userIdx',sourceKey:'userIdx'})
    }
}