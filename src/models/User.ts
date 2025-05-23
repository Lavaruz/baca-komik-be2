// import { DataTypes, Model,CreationOptional, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyRemoveAssociationsMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManySetAssociationsMixin } from "sequelize";
// import { sequelize } from "."; // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
// import Experience from "./UserExperience";
// import Education from "./UserEducation";
// import Attachment from "./UserAttachment";
// import Socials from "./UserSocial";
// import Skills from "./Skills";
// import Config from "./UserConfig";
// import Post from "./Post";

// class User extends Model {
//   declare id: CreationOptional<number>;
//   declare headline: string;
//   declare email: string;
//   declare role: number;
//   declare profile_picture: string;
//   declare firstname: string;
//   declare lastname: string;
//   declare summary: string;
//   declare work_pref_status: string;

//   // createdAt can be undefined during creation
//   declare createdAt: CreationOptional<Date>;
//   // updatedAt can be undefined during creation
//   declare updatedAt: CreationOptional<Date>;

//   // Mixin Education Has Many
//   declare addEducation: HasManyAddAssociationMixin<Education, number>
//   declare hasEducation: HasManyHasAssociationMixin<Education, number>
//   declare removeEducation: HasManyRemoveAssociationsMixin<Education,number>
//   declare getEducations: HasManyGetAssociationsMixin<Education>

//   declare addExperience: HasManyAddAssociationMixin<Experience, number>
//   declare hasExperience: HasManyHasAssociationMixin<Experience, number>
//   declare removeExperience: HasManyRemoveAssociationsMixin<Experience,number>
//   declare getExperiences: HasManyGetAssociationsMixin<Experience>

//   declare createAttachments: HasOneCreateAssociationMixin<Attachment>
//   declare getAttachments: HasOneGetAssociationMixin<Attachment>
//   declare setAttachments: HasOneSetAssociationMixin<Attachment, number>

//   declare createConfig: HasOneCreateAssociationMixin<Config>
//   declare getConfig: HasOneGetAssociationMixin<Config>
//   declare setConfig: HasOneSetAssociationMixin<Config, number>

//   declare createSocials: HasOneCreateAssociationMixin<Socials>
//   declare getSocials: HasOneGetAssociationMixin<Socials>
//   declare setSocials: HasOneSetAssociationMixin<Socials, number>

//   declare addSkills: BelongsToManyAddAssociationMixin<Skills, number>
//   declare getSkills: BelongsToManyGetAssociationsMixin<Skills>
//   declare removeSkills: BelongsToManyRemoveAssociationMixin<Skills,number>
//   declare setSkills: BelongsToManySetAssociationsMixin<Skills,number>

//   declare addSaved_post: BelongsToManyAddAssociationMixin<Post, number>;
//   declare getSaved_posts: BelongsToManyGetAssociationsMixin<Post>;
//   declare removeSaved_post: BelongsToManyRemoveAssociationMixin<Post, number>;
//   declare setSaved_posts: BelongsToManySetAssociationsMixin<Post, number>;


// }

// const ADMIN_ROLE = 1
// const USER_ROLE = 2

// User.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//       unique: true,
//     },
//     headline: {
//       type: DataTypes.TEXT,
//       defaultValue: ""
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.INTEGER,
//       defaultValue: USER_ROLE
//     },
//     profile_picture: {
//       type: DataTypes.TEXT,
//     },
//     firstname:{
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastname:{
//       type: DataTypes.STRING
//     },
//     summary:{
//       type: DataTypes.TEXT
//     },
//     mobile: DataTypes.STRING,
//     sex: DataTypes.STRING,
//     current_status: DataTypes.TEXT,
//     profile_viewers: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0
//     },
//     active_search: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false
//     },
//     domicile: DataTypes.STRING,
//     date_of_birth: DataTypes.STRING,
//     work_pref_status: {
//       type: DataTypes.STRING,
//       defaultValue: "WFO"
//     },
//     salary: {
//       type: DataTypes.STRING,
//       defaultValue: "0"
//     },
//   },
//   {
//     sequelize, // Instance Sequelize yang digunakan
//   }
// );

// User.hasMany(Experience, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'experiences',
//   constraints:false
// });
// User.hasMany(Education, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'educations',
//   constraints:false
// });
// User.hasOne(Attachment, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'attachments',
//   constraints:false
// });
// User.hasOne(Socials, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'socials',
//   constraints:false
// });
// User.hasOne(Config, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'config',
//   constraints:false
// });


// User.belongsToMany(Skills,{
//   as: "skills",
//   sourceKey: "id",
//   constraints: false,
//   through: "UserSkill"
// })
// Skills.belongsToMany(User,{
//   as: "users",
//   sourceKey: "id",
//   constraints: false,
//   through: "UserSkill"
// })

// // SAVED POSTS
// User.belongsToMany(Post,{
//   as: "saved_posts",
//   sourceKey: "id",
//   constraints: false,
//   through: "UserPostSaved"
// })
// Post.belongsToMany(User,{
//   as: "saved_by",
//   sourceKey: "id",
//   constraints: false,
//   through: "UserPostSaved"
// })

// export default User;
