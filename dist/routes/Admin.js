"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminControllers_1 = require("../controllers/adminControllers");
const router = express_1.default.Router();
router.post('/register', adminControllers_1.adminRegister);
router.post('/login', adminControllers_1.adminLogin);
exports.default = router;
