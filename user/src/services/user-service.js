const { UserRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email_id, password } = userInputs;

    try {
      const existingUser = await this.repository.FindUser({ email_id });

      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            first_name: existingUser.first_name,
            last_name: existingUser.last_name,
            email_id: existingUser.email_id,
            _id: existingUser._id,
            phone_number: existingUser.phone_number
          });
          return FormateData({ id: existingUser._id, token });
        }
      }

      return FormateData(null);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SignUp(userInputs) {
    const { first_name, last_name, email_id, password, phone_number } =
      userInputs;

    try {
      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const existingUser = await this.repository.CreateUser({
        first_name,
        last_name,
        email_id,
        password: userPassword,
        phone_number,
        salt,
      });

      const token = await GenerateSignature({
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        email_id: email_id,
        _id: existingUser._id,
        phone_number: existingUser.phone_number
      });

      return FormateData({ id: existingUser._id, token });
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProfile(id) {
    try {
      const existingUser = await this.repository.FindUserById({ id });
      return FormateData(existingUser);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async EditProfile(userInputs) {
    try {
      const existingUser = await this.repository.FindUserByIdAndUpdate(userInputs);
      return FormateData(existingUser);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = UserService;
