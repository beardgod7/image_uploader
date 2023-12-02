import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import  sequelize  from '../pgconfig/pgconfig'; 

interface UserAttributes {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  createdAt: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string | null;
  public lastName!: string | null;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;

