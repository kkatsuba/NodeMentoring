export default (req, res, next) => {
    const cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
    req.parsedCookie = cookies.reduce((res, cookie) => {
        const parsed = cookie.split('=');
        return Object.assign(res, {
            [parsed[0]]: parsed[1]
        });
    }, {});
    
    next();
};