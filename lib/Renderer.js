const Post = require("../services/Posts");
const Category = require("../services/Categories");
const Footers = require("../services/Footers");

class RenderService {
  constructor() {
    this.locals = {};
    this.locals.title = "";
    this.locals.description = "";
    this.locals.icon = "";
    this.locals.result = null;
    this.locals.post = null;
    this.locals.popular = null;
    this.locals.recent = null;
    this.locals.footer = null;
    this.locals.allPost = null;
    this.locals.result = null;
    this.locals.flash = null;
    this.locals.validation_error = null;
    this.locals.success_message = null;
    this.locals.error = null;
  }

  async setData(res) {
    this.locals.post = await Post.listPostsWithDetails({ share: true });
    this.locals.popular = await Post.listSortingPostswithDetails(
      { share: true },
      { click: "desc" }
    );
    this.locals.recent = await Post.listPostsSortAndLimit(
      { share: true },
      { createdAt: "desc" },
      3
    );
    this.locals.footer = await Footers.findOne({});
    this.locals.allPost = await Post.list({ share: true });
    this.locals.result = await Category.list();
    return (res.locals = this.locals);
  }

  setHead(res, title, description, icon) {
    try {
      this.locals = res.locals;
      this.locals.validation_error = res.locals.validation_error || undefined;
      this.locals.success_message = res.locals.success_message || undefined;
      this.locals.error = res.locals.error || undefined;
      this.locals.title =
        title ||
        "Posttware | Your hub for tech trends and digital discoveries!";
      this.locals.description =
        description ||
        "Explore the latest in technology with our comprehensive guides, insightful reviews, and cutting-edge insights. From smartphones to artificial intelligence, our tech blog covers the trends shaping the digital landscape. Stay informed, stay ahead with expert analysis, in-depth articles, and exclusive interviews with industry leaders. Discover how technology is transforming our world and shaping the future. Dive into innovation and discover the possibilities with our tech-focused content.";
      this.locals.icon = icon || "/frontend/images/TT.png";
     
      return (res.locals = this.locals);
    } catch (error) {}
  }

  setLocals(res, values) {
    try {
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          this.locals[key] = values[key];
        }
      }
      return (res.locals = this.locals);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new RenderService();
