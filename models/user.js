const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userid:{
                type:Sequelize.STRING(30),
                allowNull:false,
                unique:true
            },
            userpw:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            class_team:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            pay:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            name:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            nickname:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            birth:{
                type:Sequelize.DATE,
                allowNull:false,
            },
            gender:{
                type:Sequelize.BOOLEAN,
                allowNull:true
            },
            email:{
                type:Sequelize.STRING(50),
                allowNull:false
            },
            today:{
                allowNull:false,
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
            },
            tel:{
                allowNull:false,
                unique:true,
                type:Sequelize.INTEGER

            },
            img:{
                type:Sequelize.TEXT,
                allowNull:true          
            },
            etc:{
                type:Sequelize.TEXT,
                allowNull:true  
            },
            onoff:{
                type:Sequelize.BOOLEAN,
                allowNull:true,
                defaultValue:1
            },
            portfolio:{
                type:Sequelize.TEXT,
                allowNull:true  
            },
                     
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'user',
            tableName:'users',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    
}