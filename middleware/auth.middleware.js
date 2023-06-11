const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
        if (token) {
            const decoded = jwt.verify(token, "masai")
            if (decoded) {
                req.body.userId = decoded.userId;
                req.body.user = decoded.name
                next()
            }else{
                res.json({msg:"wrong token"})
            }
        }else{
            res.json({msg:"Login first"})
        }
    } catch (error) {
        res.json({msg:error})
    }
}


module.exports = {
    auth
}