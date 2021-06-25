const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Visitor extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            currentURL:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            exURL:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            userAgent:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            userLanguage:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            webwidth:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            webHeight:{
                type:Sequelize.STRING(255),
                allowNull:false,
            },
            time:{
                allowNull:false,
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('startDate')).format('YYYY-MM-DD-hh-mm-ss')
                },
            },
            totalCount:{
                type:Sequelize.STRING(50),
                allowNull:false,
                defaultValue:0
            },
            todayConut:{
                type:Sequelize.STRING(50),
                allowNull:false,
                defaultValue:0

            },
            name:{
                type:Sequelize.STRING(50),
                allowNull:true
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Visitor',
            tableName:'visitors',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
}