const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Popup extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type:Sequelize.TEXT,
                false:true
            },
            width:{
                type:Sequelize.TEXT,
                false:true
            },
            height:{
                type:Sequelize.TEXT,
                false:true
            },
            locate:{
                type:Sequelize.TEXT,
                false:true
            },
            textcontent:{
                type:Sequelize.TEXT,
                false:true
            },
            link:{
                type:Sequelize.TEXT,
                false:true
            },
            watchaut:{
                type:Sequelize.BOOLEAN,
                allowNull:this.truncate,
                defaultValue:0
            },
            img:{
                type:Sequelize.TEXT,
                false:true
            },
            duration:{
                type:Sequelize.TEXT,
                false:true
            }

        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Popup',
            tableName:'popups',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'

        })
    }
}