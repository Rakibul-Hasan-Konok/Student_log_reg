import { TokenDecode } from "../utility/tokenUtility.js";

export default (req, res, next) => {
    let token = req.cookies.token || req.headers['token'];
    let decoded = TokenDecode(token);
    if (decoded === null) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
        req.user = decoded; // Store decoded data for use in routes
        next();
    }
};
