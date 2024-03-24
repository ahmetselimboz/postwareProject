const BaseService = require("./BaseServices");
const BaseModel = require("../db/models/Posts");
class Posts extends BaseService {
  constructor() {
    super(BaseModel);
  }
  
  findOne(where) {
    return BaseModel?.findOne(where || {});
  }


  listPostsWithDetails(where) {
    return BaseModel?.find(where || {}).populate([
      {
        path: "userId",
        select: "name surname username photo about urls",
      },
      { path: "categoryId" },
    ]);
  }

  listSortingPostswithDetails(where, sort) {
    return BaseModel?.find(where || {})
      .populate([
        {
          path: "userId",
          select: "name surname username photo about urls",
        },
        { path: "categoryId" },
      ])
      .sort(sort);
  }

  listPostsSortAndLimit(where, sort, limit) {
    return BaseModel?.find(where || {})
      .sort(sort || {})
      .limit(limit || {}).populate([
        {
          path: "userId",
          select: "name surname username photo about urls",
        },
        { path: "categoryId" },
      ]);
  }
}

module.exports = new Posts();
