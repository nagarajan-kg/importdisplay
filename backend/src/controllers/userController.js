const fs = require('fs');
const csv = require('csv-parser');
const User = require('../models/User');

exports.importUsers = (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      await User.insertMany(results);
      res.json({ message: 'Users imported successfully' });
    });
};

exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();

  res.json({
    data: users,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
};
