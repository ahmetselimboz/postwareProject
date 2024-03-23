const User = require("../db/models/Users");
const Footer = require("../db/models/Footers");
const bcrypt = require("bcryptjs");

const mainAdmin = async () => {
  try {
    const findUser = await User.find({ mainAdmin: true });

    if (!findUser[0]) {
      const newUser = new User({
        name: "Admin",
        surname: "Admin",
        username: "Admin",
        isAdmin: true,
        mainAdmin: true,
        password: await bcrypt.hash("123456", 10),
      });

      await newUser.save();
    }
  } catch (error) {}
};

const emptyData = async () => {
  try {
    const result = await Footer.findOne();

    if (!result) {
      const footer = new Footer();
      footer.urls.instagram = ".";
      footer.urls.twitter = ".";
      footer.urls.facebook = ".";
      footer.save();
    }
  } catch (error) {}
};

module.exports = { mainAdmin,emptyData };
