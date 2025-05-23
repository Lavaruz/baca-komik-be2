import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from ".";

class Author extends Model {
  declare id: CreationOptional<string>;
  declare name: string;
  declare slug: string;
  declare bio?: string;
  declare avatar?: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Author.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bio: DataTypes.TEXT,
  avatar: DataTypes.STRING,
}, {
  sequelize,
  modelName: "Author",
});

export default Author;
