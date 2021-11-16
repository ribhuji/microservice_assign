const { LikeModel, ReadModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class InteractionRepository {
  async CreateLike({ content_id, user_id }) {
    try {
      const like = new LikeModel({
        content_id,
        user_id,
      });
      const likeResult = await like.save();
      return likeResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Like"
      );
    }
  }

  async CreateRead({ content_id, user_id }) {
    try {
      const read = new ReadModel({
        content_id,
        user_id,
      });
      const readResult = await read.save();
      return readResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Read"
      );
    }
  }
}

module.exports = InteractionRepository;
