"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./route/routes"));
const dbconfig_1 = __importDefault(require("./database/dbconfig/dbconfig"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
dotenv_1.default.config();
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({
        path: "privacy/.env",
    });
}
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
(0, dbconfig_1.default)();
app.use("/api/v2/user", routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`app is running on http://localhost:${process.env.PORT}`);
});
