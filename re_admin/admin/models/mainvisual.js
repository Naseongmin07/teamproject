const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class main_visual extends Sequelize.Model{
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
                type:Sequelize.DATE,
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
            modelName:'mainvisual',
            tableName:'mainvisuals',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'

        })
    }
}