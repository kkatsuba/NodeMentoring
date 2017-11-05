export default (req, res, next) => {
    // Hmmm.... Very strange 'hotelka'. express alredy support
    // quert params http://expressjs.com/en/4x/api.html#req.query
    req.parsedQuery = req.query;
    next();
};