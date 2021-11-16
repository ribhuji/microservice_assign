const { UserModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class UserRepository {
  async CreateUser({
    first_name,
    last_name,
    email_id,
    password,
    phone_number,
    salt,
  }) {
    try {
      const user = new UserModel({
        first_name,
        last_name,
        email_id,
        password,
        phone_number,
        salt,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create User"
      );
    }
  }

  async FindUser({ email_id }) {
    try {
      const existingUser = await UserModel.findOne({ email_id: email_id });
      return existingUser;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async FindUserById({ id }) {
    try {
      const existingUser = await UserModel.findById(id);

      return existingUser;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async FindUserByIdAndUpdate({
    first_name,
    last_name,
    email_id,
    phone_number,
    id,
  }) {
    try {
      const existingUser = await UserModel.findByIdAndUpdate(
        id,
        { first_name, last_name, email_id, phone_number },
        { new: true, runValidators: false }
      );
      return existingUser;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update User"
      );
    }
  }
}

module.exports = UserRepository;
