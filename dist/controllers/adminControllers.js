"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegister = void 0;
const utils_1 = require("../Utils/utils");
//===Register===//
const adminRegister = async (req, res) => {
    try {
        const { name, email, password, confirm_password, phone } = req.body;
        const validateInput = utils_1.registerSchema.validate(req.body, option);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: "/admin/register"
        });
    }
};
exports.adminRegister = adminRegister;
