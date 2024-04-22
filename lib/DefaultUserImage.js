const fs = require("fs");
const path = require("path");
const { base64ToImage } = require("./Minio");

async function convertToDataURI() {
  try {
    // Dosya okuma işlemi
    const imageBuffer = fs.readFileSync(
      path.join(__dirname, "../uploads/images/defaultUser.png")
    );

    // Base64'e dönüştürme
    const base64Image = imageBuffer.toString("base64");

    // Data URI oluşturma
    var dataURI = `data:image/jpeg;base64,${base64Image}`;

    // dataURI = await base64ToImage(
    //   dataURI,
    //   "Author_" + req.body.username + ".jpeg"
    // );

    return dataURI;
  } catch (error) {
    console.error("DefaultUserImage.js Error:", error);
    return null;
  }
}

module.exports = convertToDataURI;
