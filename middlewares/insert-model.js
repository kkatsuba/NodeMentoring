
const insertModel = (req, res) =>  {
  if (!req.model) {
    res.status(500).end();
  }

  req.model
    .save()
    .then(usr => res.json({
      id: usr.id
    }))
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  insertModelMiddleware: insertModel
};
