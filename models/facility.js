const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Facility extends Sequelize.Model{
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
            title:{
                type:Sequelize.STRING(255),
                allowNull:false
            },
            subboard:{
                type:Sequelize.STRING(30),
                allowNull:false
            },
            text:{
                type:Sequelize.STRING(30),
                allowNull:true
            },
            watchaut:{
                type:Sequelize.BOOLEAN,
                allowNull:true,
                defaultValue:0
            },
            date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get:function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD')
                }
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Facility',
            tableName:'facilitys',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'

        })
    }
}