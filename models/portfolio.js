const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Portfolio extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userName:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            title:{
                type:Sequelize.STRING(40),
                allowNull:false,
            },
            userIdx:{
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
            contents:{
                type:Sequelize.TEXT,
                allowNull:false
            },
            count:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            img:{
                type:Sequelize.TEXT,
                allowNull:true
            },
            watchaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0
            },
            writeaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0

            },
            replyaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0
            }
        },{
            sequelize,
            timestamps:false,
            modelName:'Portfolio',
            tableName:'portfolios',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate(db){
        db.Portfolio.belongsTo(db.User,{foreignKey:'userIdx',sourceKey:'userIdx'})
    }
}