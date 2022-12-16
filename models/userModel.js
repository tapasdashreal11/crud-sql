import sequelize from "../config/db.js";
import bcrypt from "bcryptjs";
import { DataTypes, Model } from 'sequelize';

class User extends Model {
     async matchPassword (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

User.beforeSave(async (user,options) => {
    if (!user.changed("password")) {
      return
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  })

export default User