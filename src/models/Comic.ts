import { DataTypes, Model, CreationOptional, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyRemoveAssociationsMixin, HasManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, HasManyCountAssociationsMixin } from "sequelize";
import { sequelize } from ".";
import Chapter from "./Chapter";
import Author from "./Author";
import Genre from "./Genre";

class Comic extends Model {
  declare id: CreationOptional<string>;
  declare title: string;
  declare slug: string;
  declare synopsis: string;
  declare author: string;
  declare status: "Ongoing" | "Completed";
  declare coverImage: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
  declare addChapter: HasManyAddAssociationMixin<Chapter, number>
  declare hasChapter: HasManyHasAssociationMixin<Chapter, number>
  declare removeChapter: HasManyRemoveAssociationsMixin<Chapter,number>
  declare getChapters: HasManyGetAssociationsMixin<Chapter>
  declare countChapters: HasManyCountAssociationsMixin

  declare setAuthors: BelongsToManySetAssociationsMixin<Author, number>
  declare setGenres: BelongsToManySetAssociationsMixin<Genre, number>
}

Comic.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Ongoing", "Completed"),
      defaultValue: "Ongoing",
    },
    coverImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comic",
  }
);

/**
 * M2M
 * 1 komik bisa punya banyak author
 * 1 author bisa punya banyak komik
 */
Comic.belongsToMany(Author, { through: 'ComicAuthors', as: 'authors' });
Author.belongsToMany(Comic, { through: 'ComicAuthors', as: 'comics' });

/**
 * M2M
 * Komik <-> Genre
 */
Comic.belongsToMany(Genre, { through: "ComicGenres", as: "genres" });
Genre.belongsToMany(Comic, { through: "ComicGenres", as: "comics" });


export default Comic;
