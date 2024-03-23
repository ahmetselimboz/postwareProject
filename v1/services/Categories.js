const BaseService = require("./BaseServices");
const BaseModel = require("../db/models/Categories");
class Categories extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = new Categories();
