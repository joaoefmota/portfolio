"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagesById = exports.getImages = void 0;
const database_1 = __importDefault(require("../database"));
const dataError = "Error retrieving data from the database";
const getImages = (req, res) => {
    const { project } = req.query;
    database_1.default
        .query("SELECT i.src AS source, i.image_id as id FROM images AS i INNER JOIN projects AS p ON i.project_id=p.project_id WHERE p.name=?", [project])
        .then((result) => {
        res.status(200).json(result[0]);
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send(dataError);
    });
};
exports.getImages = getImages;
const getImagesById = (req, res) => {
    const { project, image_id } = req.query;
    database_1.default
        .query("SELECT i.src AS source FROM images AS i INNER JOIN projects AS p ON i.project_id=p.id WHERE p.name=? AND i.image_id=?", [project, image_id])
        .then((result) => {
        res.status(200).json(result[0]);
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send(dataError);
    });
};
exports.getImagesById = getImagesById;
