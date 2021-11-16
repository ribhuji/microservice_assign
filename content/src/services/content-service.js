const { ContentRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class ContentService {
  constructor() {
    this.repository = new ContentRepository();
  }

  async CreateContent(contentInputs) {
    const { title, story, date_published, user_id } = contentInputs;

    try {
      const newContent = await this.repository.CreateContent({
        title,
        story,
        date_published,
        user_id,
      });

      return FormateData(newContent);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async CreateBulkContent(contentInputs) {
    const { jsonObj, user_id } = contentInputs;
    try {
      for (var i = 0; i < jsonObj.length; i++) {
        jsonObj[i].user_id = user_id;
        if (!jsonObj[i].hasOwnProperty("date_published")) {
          jsonObj[i].date_published = new Date();
        } else {
          jsonObj[i].date_published = new Date(jsonObj[i].date_published);
        }
      }

      const newContent = await this.repository.CreateBulkContent(jsonObj);

      return FormateData(newContent);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async GetContent(contentInput) {
    const { id } = contentInput;

    try {
      const existingContent = await this.repository.FindContentById({ id });

      return FormateData(existingContent);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async GetNewContent() {
    try {
      const newContents = await this.repository.GetNewContents();

      return FormateData(newContents);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async GetSortedContent(sortBy) {
    try {
      console.log(sortBy);
      const sortedContents = await this.repository.GetSortedContents(sortBy);

      return FormateData(sortedContents);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async UpdateContentStory(contentInputs) {
    const { story, id } = contentInputs;

    try {
      const existingContent =
        await this.repository.FindContentByIdAndUpdateStory({ story, id });

      return FormateData(existingContent);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async UpdateContentTitle(contentInputs) {
    const { title, id } = contentInputs;

    try {
      const existingContent =
        await this.repository.FindContentByIdAndUpdateTitle({ title, id });

      return FormateData(existingContent);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async DeleteContent(contentInput) {
    const { id } = contentInput;

    try {
      const existingContent = await this.repository.FindContentByIdAndDelete({
        id,
      });

      return FormateData(existingContent);
    } catch (err) {
      throw new APIError("Data not found", err);
    }
  }

  async IncreaseLike(contentInput) {
    const { id } = contentInput;
    try {
      await this.repository.FindContentByIdAndIncreaseLike({ id });
    } catch (error) {
      throw new APIError("Data not found", err);
    }
  }

  async IncreaseRead(contentInput) {
    const { id } = contentInput;
    try {
      await this.repository.FindContentByIdAndIncreaseReads({ id });
    } catch (error) {
      throw new APIError("Data not found", err);
    }
  }

  async callFunction(input) {
    const { EVENTS, CONTENT } = input;
    switch (EVENTS) {
      case "like":
        this.IncreaseLike({ id: CONTENT });
        break;

      case "read":
        this.IncreaseRead({ id: CONTENT });
        break;
      default:
        break;
    }
  }
}

module.exports = ContentService;
