"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Admin_1 = __importDefault(require("./routes/Admin"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(process.cwd(), './pubic')));
//Routes
app.use('/admin', Admin_1.default);
app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});
exports.default = app;
