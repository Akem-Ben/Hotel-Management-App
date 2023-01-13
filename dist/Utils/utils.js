"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = exports.PasswordHash = exports.SaltGenerator = exports.option = exports.roomSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: joi_1.default.string().equal(joi_1.default.ref('password')).required().
        label('Confirm Password').messages({ "any.only": "{{label}} does not match" }),
    phone: joi_1.default.string().required()
});
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
exports.roomSchema = joi_1.default.object().keys({
    roomType: joi_1.default.string().required(),
    roomNumber: joi_1.default.string().required(),
    roomPrice: joi_1.default.number().required(),
    // roomStatus: Joi.string(),
    // roomImage: Joi.string()
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        }
    }
};
const SaltGenerator = async () => {
    return await bcryptjs_1.default.genSalt();
};
exports.SaltGenerator = SaltGenerator;
const PasswordHash = async (password, salt) => {
    return await bcryptjs_1.default.hash(password, salt);
};
exports.PasswordHash = PasswordHash;
const tokenGenerator = async (_id) => {
    if (process.env.APP_SECRET) {
        return await jsonwebtoken_1.default.sign({ _id }, process.env.APP_SECRET, { expiresIn: `1d` });
    }
};
exports.tokenGenerator = tokenGenerator;
