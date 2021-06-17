const Sequelize = require('sequelize')

module.exports = class Test extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            idx:{ //번호?
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            title:{//제목
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            category:{ //카테고리
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            contents:{//내용
                type:Sequelize.TEXT,
                allowNull:false,
            },
            count:{ //조회수
                type:Sequelize.DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            img:{//이미지
                type:Sequelize.STRING(200),
                allowNull:true,
            },
            enrollDate:{ //등록일
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
            writer:{ //글쓴이
                type:Sequelize.TEXT,
                allowNull:false,
            },
            file:{//파일 어떤파일??
                type:Sequelize.TEXT,
                allowNull:false,
            },
            subcategory :{ //서브카테고리
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            writeaut:{ //쓰기권한
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            readaut:{ //읽기권한
                type:Sequelize.STRING(30),
                allowNull:true,
            },
            repelaut:{ //댓글권한
                type:Sequelize.STRING(30),
                allowNull:true,
            },      
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'test',
            tableName:'test',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    
}
/*
category
title
contents
count
writer
img
enrollDate
file
subcategory 
writeaut 쓰기권한
readaut 읽기권한
repelaut 댓글권한
*/