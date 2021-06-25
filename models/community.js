const Sequelize = require('sequelize')
const moment = require('moment')

module.exports = class Community extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            mainBoard:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            subBoard:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            title:{
                type:Sequelize.STRING(50),
                allowNull:false
            },
            contents:{
                type:Sequelize.TEXT('long'),
                allowNull:false
            },
            count:{
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            idx:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            writer:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            img:{
                type:Sequelize.TEXT,
                allowNull:true
            },
            enrollmentDate:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('enrollmentDate')).format('YYYY-MM-DD')
                }
            },
            file:{
                type:Sequelize.TEXT,
                allowNull:true,
            },
            writeaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0
            },
            watchaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0
            },
            replyaut:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0
            }           
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Community',
            tableName:'communitys',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
    static associate (db){
        db.Community.belongsTo(db.Adminlist,{foreignKey:'idx',sourceKey:'idx'})
        //db.Community.belongsTo(db.Submain,{foreignKey:'subBoard',sourceKey:'subBoard'})
    }
   
}