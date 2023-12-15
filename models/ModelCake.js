import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

const { DataTypes } = Sequelize;

const ModelCake = db.define(
  "tb_cake",
  {
    id_cake: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    cake: {
      type: DataTypes.STRING,
    },
    harga: {
      type: DataTypes.INTEGER(10),
    },
    desc: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default ModelCake;
