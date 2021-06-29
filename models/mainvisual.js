const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Mainvisual extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            image:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            url:{
                type:Sequelize.STRING(255),
                allowNull:false
            },
            watchaut:{
                type:Sequelize.BOOLEAN,
                allowNull:true,
                defaultValue:0
            },
            type:{
                type:Sequelize.STRING(255),
                allowNull:true
            },
            title:{
                type:Sequelize.STRING(255),
                allowNull:true
            },
            date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get:function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD')
                }
            },
            textcontent:{
                type:Sequelize.STRING(255),
                allowNull:true,
            },
            text:{
                type:Sequelize.STRING(30),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'mainvisual',
            tableName:'mainvisuals',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'

        })
    }
}