const fs = require("fs");
function writeDataToFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  writeDataToFile,
};
