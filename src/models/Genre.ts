import { Model, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from ".";

class Genre extends Model {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare image: string;
}

Genre.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.TEXT
    },
  },
  {
    sequelize,
    modelName: "Genre",
  }
);

export default Genre;
