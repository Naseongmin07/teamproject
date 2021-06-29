const Sequelize = require('sequelize')

module.exports = class Main extends Sequelize.Model{
    static init(sequelize){
        return super.init({            
            mainBoard:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            subBoard:{
                type:Sequelize.STRING(30),
                allowNull:false,
                unique:true                
            },
            watchaut:{
                type:Sequelize.BOOLEAN,
                allowNull:true,
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
            modelName:'Main',
            tableName:'mains',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }   
}