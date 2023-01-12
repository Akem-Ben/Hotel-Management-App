"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conncetDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conncetDB = async () => {
    try {
        const conn = await mongoose_1.default.connect("mongodb://localhost:27017/abn_hotels", async () => {
            console.log(`MongoDB connected`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.conncetDB = conncetDB;
