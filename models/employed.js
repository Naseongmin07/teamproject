const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Employed extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userName:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            userIdx:{
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
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
            contentimg:{
                type:Sequelize.TEXT,
                false:true
            },
            company:{
                type:Sequelize.STRING(50),
                allowNull:false
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
            year:{
                type:Sequelize.STRING(10),
                allowNull:false
            },
            replyaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0
            },
            startDate:{
                allowNull:false,
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('startDate')).format('YYYY-MM-DD')
                }
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Employed',
            tableName:'employed',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_Ci'
        })
    }
    static associate(db){{
        db.Employed.belongsTo(db.User,{foreignKey:'userIdx',sourceKey:'userIdx'})
    }
        
    }
}