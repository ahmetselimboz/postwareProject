const BaseService = require("./BaseServices");
const BaseModel = require("../db/models/Posts");
const  client  = require("../db/redis");
class Posts extends BaseService {
  constructor() {
    super(BaseModel);
  }
  
  findOne(where) {
    return BaseModel?.findOne(where || {});
  }

  async saveRedisAllPosts() {
    try {
      const check = await client.exists("Posts");

      if (!check) {
        const values = await BaseModel?.find().populate([
          {
            path: "userId",
            select: "name surname username photo about urls",
          },
          { path: "categoryId" },
        ]);

        values.forEach(async (element) => {
          await client.hSet("Posts", `${element.id}`, JSON.stringify(element));
        });
        console.log("Successfully save Redis!");
      }
    } catch (error) {
      console.error("Redis hgetall error:", error);
    }
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
