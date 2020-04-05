import jwt from 'jsonwebtoken';

export default async(req, res, next) => {
    try {
        if (
            jwt.verify(req.headers.authorization, process.env.JWT_KEY).secret === process.env.JWT_SECRET &&
            (req.headers.origin === process.env.UI_URL || req.headers.origin === process.env.UI_URL_LV || req.headers.origin === process.env.UI_URL_WWW || req.headers.origin === process.env.UI_URL_LV_WWW)
        ) {
            next()
        } else {
            res.writeHead(301, { Location: process.env.UI_URL })
            res.end()
        }
    } catch (err) {
        res.writeHead(301, { Location: process.env.UI_URL })
        res.end()
    }

}