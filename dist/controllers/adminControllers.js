"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.adminRegister = void 0;
const adminModel_1 = __importDefault(require("../model/adminModel"));
const utils_1 = require("../Utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//===Register===//
const adminRegister = async (req, res) => {
    try {
        const { name, email, password, confirm_password, phone } = req.body;
        const validateInput = utils_1.registerSchema.validate(req.body, utils_1.option);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            });
        }
        const salt = await (0, utils_1.SaltGenerator)();
        const hashedPassword = await (0, utils_1.PasswordHash)(password, salt);
        const admin = await adminModel_1.default.findOne({ email });
        if (!admin) {
            let allAdmin = await adminModel_1.default.create({
                name,
                email,
                password: hashedPassword,
                confirm_password: hashedPassword,
                salt,
                phone,
                lng: 0,
                lat: 0,
                role: "Admin"
            });
            // const mainAdmin = await Admin.findOne({email})
            return res.status(201).json({
                message: `Admin Successfully Generated`,
                name: allAdmin.name,
                email: allAdmin.email,
                phone: allAdmin.phone,
                role: allAdmin.role
            });
        }
        return res.status(400).json({
            message: `Admin Already Exist`,
            Error: "Admin Already Exist"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: "/admin/register"
        });
    }
};
exports.adminRegister = adminRegister;
//======LOGIN=====//
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validateInput = utils_1.loginSchema.validate(req.body, utils_1.option);
        console.log(validateInput);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            });
        }
        const admin = await adminModel_1.default.findOne({ email });
        if (!admin) {
            return res.status(400).json({
                message: `Admin not registered`,
                Error: `Admin Not found`
            });
        }
        if (admin) {
            const validate = await bcryptjs_1.default.compare(password, admin.password);
            if (!validate) {
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }
            if (validate) {
                const token = await (0, utils_1.tokenGenerator)(`${admin._id}`);
                res.cookie(`token`, token);
                return res.status(200).json({
                    message: `Successful login`,
                    role: admin.role,
                    email: admin.email
                });
            }
        }
        return res.status(400).json({
            message: `Invalid Credentials`
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: `/admin/login`
        });
    }
};
exports.adminLogin = adminLogin;
