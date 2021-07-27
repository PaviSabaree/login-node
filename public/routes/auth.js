"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controller/auth"));
class AuthRoute {
    constructor() {
        this.router = express_1.default.Router();
        this._signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, firstName, lastName, password, emailId } = req.body;
                const result = yield this.authService.signUp({ userName, firstName, lastName,
                    password, emailId });
                const response = {
                    status: 200,
                    message: `Sucessfully created ${result}`
                };
                res.json({ data: response });
            }
            catch (err) {
                console.log("Error occured in _signup", err);
                res.status(400).json({
                    message: err.toString()
                });
            }
        });
        this._signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailId, password } = req.body;
                const result = yield this.authService.signIn({
                    password, emailId
                });
                res.json({ data: result });
            }
            catch (err) {
                console.log("Error occured in _signIn", err);
                res.status(400).json({
                    message: err.toString()
                });
            }
        });
        this._getAuthToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield this.authService.getAccessToken(req.body.token);
                if (!tokens && tokens === undefined) {
                    throw new Error('unable to get access token');
                }
                const response = {
                    status: true,
                    msg: 'new token created successfully',
                    refreshtoken: tokens.refreshToken,
                    token: tokens.accessToken
                };
                res.json(response);
            }
            catch (err) {
                console.log("Error occured in _signIn", err);
                res.status(400).json({
                    message: err.toString()
                });
            }
        });
        this.router.post('/signup', this._signup);
        this.router.post('/signin', this._signIn);
        this.router.post('/getAuthToken', this._getAuthToken);
        this.authService = new auth_1.default();
    }
}
exports.default = AuthRoute;
