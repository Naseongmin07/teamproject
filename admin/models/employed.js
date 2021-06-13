const { STRING } = require('sequelize')
const Sequelize = require('sequelize')

module.exports = class Employed extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userName:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            courseName:{
                type:Sequelize.STRING(30),
                allowNull:false
            },
            count:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0      
            },
            contents:{
                type:Sequelize.TEXT,
                allowNull:true
            },
            img:{
                type:Sequelize.TEXT,
                false:true
            },
            company:{
                type:Sequelize.STRING(50),
                allowNull:false
            },
            watchaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false
            },
            writeaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false
            },
            repelaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'employed',
            tableName:'employed',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_Ci'
            
        })
    }
}