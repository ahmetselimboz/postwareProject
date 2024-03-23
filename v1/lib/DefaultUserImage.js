const fs = require("fs");

function convertToDataURI() {
  try {
    // Dosya okuma işlemi
    const imageBuffer = fs.readFileSync("./uploads/images/defaultUser.png");

    // Base64'e dönüştürme
    const base64Image = imageBuffer.toString("base64");

    // Data URI oluşturma
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    return dataURI;
  } catch (error) {
    console.error("DefaultUserImage.js Error:", error);
    return null;
  }
}

module.exports = convertToDataURI
