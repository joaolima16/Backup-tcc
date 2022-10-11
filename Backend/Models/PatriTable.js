const dbConn = require("../Config/dbConfig");
const Sequelize = require("sequelize");

const enumTypes = ["cadeira","projetor","pc","televisao","mesa"];
const enumStatus = ["ativo","manutencao","danificado","movido"];


const Table = dbConn.define("patrimony",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    nPatrimony:{
        type: Sequelize.INTEGER,
        allowNull: false,
        Unique:false,
    },
    image:{
        type: Sequelize.STRING,
        allowNull:true
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    type:{
        type: Sequelize.ENUM(enumTypes),
        allowNull: false,
    },
    status:{
        type: Sequelize.ENUM(enumStatus),
        allowNull:true,
    },
    value:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});


module.exports = {
    Table,
    enumTypes,
    enumStatus
};