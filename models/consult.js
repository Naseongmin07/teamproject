const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Consult extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type:Sequelize.STRING(30),
                allowNull:false,
                unique:true
            },
            gender:{
                type:Sequelize.BOOLEAN,
                allowNull:true
            },
            age:{
                type:Sequelize.INTEGER,
                allowNull:true,
            },
            email:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            tel:{
                type:Sequelize.INTEGER,
                allowNull:false,
            },
            etc:{
                type:Sequelize.TEXT,
                allowNull:true,
            },
            today:{
                allowNull:false,
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('today')).format('YYYY-MM-DD')
                }
            },   
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'consult',
            tableName:'consult',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
}
