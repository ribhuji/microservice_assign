const { InteractionRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class ContentService {
  constructor() {
    this.repository = new InteractionRepository();
  }

  async CreateLike(likeInput) {
    const { content_id, user_id } = likeInput;

    try {
      const newLike = await this.repository.CreateLike({content_id, user_id});

      return FormateData(newLike);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async CreateRead(likeInput) {
    const { content_id, user_id } = likeInput;

    try {
      const newRead = await this.repository.CreateRead({content_id, user_id});

      return FormateData(newRead);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }


}

module.exports = ContentService;
