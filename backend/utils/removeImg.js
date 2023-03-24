const fs = require('fs');

module.exports = removeImg = (filename) => {
  const filePath = `uploads/${filename}`;

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting file!' });
      }
    });
  }
};
