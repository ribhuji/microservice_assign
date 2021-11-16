const { ContentModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class ContentRepository {
  async CreateContent({ title, story, date_published, user_id }) {
    try {
      const content = new ContentModel({
        title,
        story,
        date_published,
        user_id,
      });
      const contentResult = await content.save();
      return contentResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Content"
      );
    }
  }

  async CreateBulkContent(contentInputs) {
    try {
      const contentResult = await ContentModel.insertMany(contentInputs);
      // console.log(contentResult);
      return { Uploaded: "true" };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Content"
      );
    }
  }

  async FindContentById({ id }) {
    try {
      const existingContent = await ContentModel.findById(id);

      return existingContent;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Content"
      );
    }
  }

  async GetNewContents() {
    try {
      const existingContents = await ContentModel.find()
        .sort({ date_published: -1 })
        .limit(10);

      return existingContents;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Content"
      );
    }
  }

  async GetSortedContents(sortBy) {
    console.log(sortBy);

    try {

      if(sortBy=='likes'){
        const existingContents = await ContentModel.find()
        .sort({ likes: -1 })
        .limit(10);

        return existingContents;
      } else {
        const existingContents = await ContentModel.find()
        .sort({ reads: -1 })
        .limit(10);

        return existingContents;
      }

      
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Content"
      );
    }
  }

  async FindContentByIdAndUpdateTitle({ title, id }) {
    try {
      const existingContent = await ContentModel.findByIdAndUpdate(
        id,
        { title },
        { new: true, runValidators: false }
      );
      return existingContent;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update Title"
      );
    }
  }

  async FindContentByIdAndUpdateStory({ story, id }) {
    try {
      const existingContent = await ContentModel.findByIdAndUpdate(
        id,
        { story },
        { new: true, runValidators: false }
      );
      return existingContent;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Update Story"
      );
    }
  }

  async FindContentByIdAndDelete({ id }) {
    try {
      const existingContent = await ContentModel.findByIdAndDelete(id);

      return { status: "Content Deleted" };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Content"
      );
    }
  }

  async FindContentByIdAndIncreaseLike({ id }) {
    try {
      const existingContent = await ContentModel.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true, runValidators: false }
      );
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Content"
      );
    }
  }

  async FindContentByIdAndIncreaseReads({ id }) {
    try {
      const existingContent = await ContentModel.findByIdAndUpdate(
        id,
        { $inc: { reads: 1 } },
        { new: true, runValidators: false }
      );
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Content"
      );
    }
  }
}

module.exports = ContentRepository;
