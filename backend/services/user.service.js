const UserModel = require("../models/user.model");

/**
 * Create or fetch user after Google auth + personalization
 */
const upsertUser = async (userData) => {
  const existingUser = await UserModel.getUserByEmail(userData.email);

  if (existingUser) {
    return existingUser;
  }

  return await UserModel.createUser(userData);
};

module.exports = {
  upsertUser,
};
