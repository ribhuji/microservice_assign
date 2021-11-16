const ContentService = require("../services/content-service");
const UserAuth = require("./middlewares/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const csv = require("csvtojson");
const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
  const service = new ContentService();
  SubscribeMessage(channel, service);

  app.post("/", UserAuth, async (req, res, next) => {
    try {
      const { title, story } = req.body;
      const date_published = Date(req.body.date_published) || new Date();
      const { data } = await service.CreateContent({
        title,
        story,
        date_published,
        user_id: req.user._id,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post(
    "/bulk",
    UserAuth,
    upload.single("csvfile"),
    async (req, res, next) => {
      try {

        const jsonObj = await csv().fromString(
          req.file.buffer.toString("utf8")
        );



        const {data} = await service.CreateBulkContent({jsonObj, user_id: req.user._id});

        return res.json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get("/", async (req, res, next) => {
    try {
      if (req.query.sort == "reads" || req.query.sort == "views") {
        console.log(req.query.sort);
        const { data } = await service.GetSortedContent(req.query.sort);
        return res.json(data);
      } else {
        const { data } = await service.GetNewContent();
        return res.json(data);
      }
    } catch (err) {
      next(err);
    }
  });

  app.get("/new", async (req, res, next) => {
    try {
      const { data } = await service.GetNewContent();
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/getById", async (req, res, next) => {
    try {
      const { id } = req.body;
      const { data } = await service.GetContent({ id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/edit/story", UserAuth, async (req, res, next) => {
    try {
      const { story, id } = req.body;

      const { data } = await service.UpdateContentStory({ story, id });
      return res.json(data);
    } catch (err) {
      throw err;
    }
  });

  app.put("/edit/title", UserAuth, async (req, res, next) => {
    try {
      const { title, id } = req.body;

      const { data } = await service.UpdateContentStory({ title, id });
      return res.json(data);
    } catch (err) {
      throw err;
    }
  });

  app.delete("/delete", UserAuth, async (req, res, next) => {
    try {
      const { id } = req.body;
      const { data } = await service.DeleteContent({ id });
      return res.json(data);
    } catch (err) {
      throw err;
    }
  });
};
