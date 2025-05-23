import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from ".";
import Comic from "./Comic";

class Chapter extends Model {
  declare id: CreationOptional<string>;
  declare comicId: string;
  declare title: string;
  declare slug: string;
  declare pages: string; // Menyimpan JSON string dari array URLs
  declare chapterNumber: number;
  declare releaseDate: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Chapter.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    comicId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Comics",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pages: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
      get() {
        const rawValue = this.getDataValue('pages');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('pages', JSON.stringify(value));
      }
    },
    chapterNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Chapter",
  }
);

Chapter.belongsTo(Comic, { foreignKey: "comicId", as: "comic" });
Comic.hasMany(Chapter, { foreignKey: "comicId", as: "chapters" });

export default Chapter;
