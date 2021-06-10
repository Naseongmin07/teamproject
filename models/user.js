const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            idx:{
                type:Sequelize.STRING(20),
                allowNull:false,
                primarykey:true,
                unique:true
            },
            psw:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            name:{
                type:Sequelize.STRING(30),
                allowNull:false,
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
            created_at:{
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

            }            
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