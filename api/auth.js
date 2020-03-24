import jwt from 'jsonwebtoken';

export default async(req, res, next) => {

    try {
        if (jwt.verify(req.headers.authorization, process.env.JWT_KEY).secret !== process.env.JWT_SECRET || req.headers.origin !== process.env.UI_URL) {
            res.writeHead(301, { Location: process.env.UI_URL })
            res.end()
        } else {
            next()
        }
    } catch (err) {
        res.writeHead(301, { Location: process.env.UI_URL })
        res.end()
    }

}