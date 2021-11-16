const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new UserService();

  app.post("/signup", async (req, res, next) => {
    try {
      const { first_name, last_name, email_id, password, phone_number } =
        req.body;
      const { data } = await service.SignUp({
        first_name,
        last_name,
        email_id,
        password,
        phone_number,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email_id, password } = req.body;

      const { data } = await service.SignIn({ email_id, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/profile/edit", UserAuth, async (req, res, next) => {
    try {
      const updatedFields = {
        first_name: req.body.first_name || req.user.first_name,
        last_name: req.body.last_name || req.user.last_name,
        email_id: req.body.email_id || req.user.email_id,
        phone_number: req.body.phone_number || req.user.phone_number,
        id: req.user._id,
      };

      // console.log(updatedFields);

      const { data } = await service.EditProfile(updatedFields);
      return res.json(data);
    } catch (err) {
      throw err;
    }
  });
};
