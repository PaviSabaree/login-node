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
const index_1 = __importDefault(require("../controller/index"));
class LoginClass {
    constructor() {
        this.router = express_1.default.Router();
        this.checkSample = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({ "status": "success" });
        });
        this.getLoginInfos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getLoginInfos();
            res.json(result);
        });
        this.getLoginInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getLoginInfo(req.params.id);
            res.json(result);
        });
        this.updateLoginInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.updateLoginInfo(req.params.id, req.params.username, req.body.email, req.body.password);
            res.json(result);
        });
        this.deleteLoginInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.deleteLoginInfo(req.params.id);
            res.json(result);
        });
        this.addLoginInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            console.log('username ==', username);
            console.log('email ==', email);
            console.log('password ==', password);
            const result = yield this.service.saveUser(username, email, password);
            res.json(result);
        });
        this.router.get('/sample', this.checkSample);
        this.router.post('/addLoginInfos', this.addLoginInfo);
        this.router.get('/getLoginInfos', this.getLoginInfos);
        this.router.get('/getLoginInfo/:id', this.getLoginInfo);
        this.router.put('/getLoginInfo/:id', this.updateLoginInfo);
        this.router.delete('/getLoginInfo/:id', this.deleteLoginInfo);
        this.service = new index_1.default();
    }
}
exports.default = LoginClass;
