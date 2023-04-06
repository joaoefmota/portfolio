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
exports.deleteProjectById = exports.postProject = exports.getProjectById = exports.getProjectByName = exports.getAllProjects = void 0;
const database_1 = __importDefault(require("../database"));
const fs = require("fs"); // to rename files, for example
const ADMIN = process.env.ADMIN;
const dataError = "Error retrieving data from the database";
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [query] = yield database_1.default.query("SELECT * FROM projects");
        res.status(200).json(query);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.getAllProjects = getAllProjects;
const getProjectByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const [query] = yield database_1.default.query("SELECT * FROM projects WHERE name=?", [name]);
        res.status(200).json(query);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.getProjectByName = getProjectByName;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const [query] = yield database_1.default.query("SELECT * FROM projects WHERE id=?", [
            id,
        ]);
        if (query != null) {
            res.status(200).json(query);
        }
        else {
            res.status(404).send("Project not found");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.getProjectById = getProjectById;
const postProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project_id, name, subTitle, content, lg_content1, lg_content2, tools, packages, link, github, aka, } = req.body;
    if (name == null ||
        project_id == null ||
        content == null ||
        tools === null ||
        link === null ||
        github === null ||
        subTitle === null ||
        lg_content1 === null ||
        aka === null ||
        lg_content2 === null) {
        return res.status(401).send({ error: "Incorrect values" });
    }
    const existsQuery = "SELECT * FROM projects WHERE project_id =? OR name = ?";
    const [rows] = yield database_1.default.query(existsQuery, [project_id, name]);
    const rowDataPacket = rows;
    if (rowDataPacket.length !== 0) {
        const { exists, project_id: existingProjectId, name: existingName, } = rowDataPacket[0];
        if (exists && existingProjectId === project_id) {
            return res.status(400).send({ error: "Project id already exists" });
        }
        else if (exists && existingName === name) {
            return res
                .status(400)
                .send({ error: "Name of the project already exists" });
        }
    }
    try {
        const [query] = yield database_1.default.query("INSERT INTO projects (project_id, name, subTitle, content, lg_content1, lg_content2, tools, packages, link, github, aka) VALUES  (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            project_id,
            name,
            subTitle,
            content,
            lg_content1,
            lg_content2,
            tools,
            packages,
            link,
            github,
            aka,
        ]);
        const insertId = query.insertId;
        res.location(`./api/projects/${insertId}`).sendStatus(201);
        fs.mkdirSync(`src/images/projects/${name}`);
    }
    catch (err) {
        if ((err.code = "ERR_DUP_ENTRY")) {
            console.log(err);
            res.status(500).send(`The project with name: ${name} already exists`);
        }
        else {
            console.log(err);
            res.status(500).send(dataError);
        }
    }
});
exports.postProject = postProject;
const deleteProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.project_id;
    const payloadSub = req.payload.sub;
    // console.log("reqPayload", payloadSub);
    if (payloadSub !== ADMIN) {
        res.status(403).send("Forbidden");
        return;
    }
    try {
        const [query] = yield database_1.default.query("DELETE FROM projects WHERE project_id=?", [id]);
        const result = query;
        if (result.affectedRows === 0) {
            res.status(404).send("Not found");
        }
        else {
            res.status(204).send("Project deleted");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.deleteProjectById = deleteProjectById;
