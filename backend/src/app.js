"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const cors_1 = __importDefault(require("cors"));
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mainrouter_1 = __importDefault(require("./routers/mainrouter"));
dotenv_1.default.config();
const EXPRESS_PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "5005", 10);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello There!");
});
app.listen(EXPRESS_PORT, () => {
    if (database_1.default.getConnection() === null) {
        console.error("Warning: database connection failed");
        process.exit(1);
    }
    console.log("Express listening on port: http://localhost:", EXPRESS_PORT);
});
app.use("/images", express_1.default.static(path.join(__dirname, "images")));
app.use("/", mainrouter_1.default);
