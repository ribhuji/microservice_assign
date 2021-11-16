const { CONTENT_BINDING_KEY } = require("../config");
const InteractionService = require("../services/interaction-service");
const { PublishMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  const service = new InteractionService();

  app.post("/like", UserAuth, async (req, res, next) => {
    try {
      const { content_id } = req.body;
      const { data } = await service.CreateLike({
        content_id, user_id: req.user._id
      });

      PublishMessage(channel, JSON.stringify({EVENTS: 'like', CONTENT: content_id}));

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/read", UserAuth, async (req, res, next) => {
    try {
      const { content_id } = req.body;
      const { data } = await service.CreateRead({
        content_id, user_id: req.user._id
      });

      PublishMessage(channel, JSON.stringify({EVENTS: 'read', CONTENT: content_id}));

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });



};
