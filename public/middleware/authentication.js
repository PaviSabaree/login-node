"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const authenticateToken = (req, resp, next) => {
    try {
        console.log('came to auth');
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token);
        if (token == null) {
            return resp.sendStatus(401);
        }
        const ACCESS_TOKEN_SECRET = " 1ff72875fd1fdb36287b0e8901262fb1547fac6b9647cc06aea129822a98873a9e05857626283f7d114c86904858b3876235d88de28348c51e63ee9fde53a384";
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(err);
            if (err) {
                return resp.sendStatus(403);
            }
            console.log('token verified');
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.log('Authentication error  ===', error);
        throw error;
    }
};
exports.default = authenticateToken;
