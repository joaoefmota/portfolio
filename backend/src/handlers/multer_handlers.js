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
exports.uploadProjectImages = exports.uploadMainImage = void 0;
const multer_1 = __importDefault(require("multer"));
const database_1 = __importDefault(require("../database"));
const fs = require("fs"); // to rename files, for example
const uploadMainImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadMain = (0, multer_1.default)({ dest: "src/images/projects/proj_container/" });
    uploadMain.single("uploaded_file")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        const projectName = req.query.projectName;
        console.log("projectName", projectName);
        console.log("req.file Main", req.file);
        try {
            const requestedFile = req.file;
            if (requestedFile === undefined)
                return;
            const oldPath = `src/images/projects/proj_container/${requestedFile.filename}`;
            const newPath = `src/images/projects/proj_container/${requestedFile.originalname}`;
            const rename = yield fs.promises.rename(oldPath, newPath);
            console.log("Rename complete!", rename);
            const [id] = (yield database_1.default.query("SELECT project_id FROM projects WHERE name = ?", [projectName]));
            const src = `/images/projects/proj_container/${requestedFile.originalname}`;
            const project_id = id[0].project_id;
            yield database_1.default.query("INSERT INTO images (src, project_id, image_id) VALUES (?, ?, ?)", [src, project_id, 0]);
            res.send("File uploaded");
        }
        catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }));
});
exports.uploadMainImage = uploadMainImage;
const uploadProjectImages = (req, res) => {
    const projectName = req.query.projectName;
    function createStorageEngine(projectName) {
        return multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `src/images/projects/${projectName}/`);
            },
        });
    }
    const storage = createStorageEngine(projectName);
    const upload = (0, multer_1.default)({ storage: storage }).array("file", 9);
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return res.status(500).send("Error uploading file");
            }
            const requestedFiles = req.files;
            if (requestedFiles == undefined)
                return;
            // update the file names and insert into the database
            for (let index = 0; index < requestedFiles.length; index++) {
                const file = requestedFiles[index];
                const oldPath = `src/images/projects/${projectName}/${file.filename}`;
                const newPath = `src/images/projects/${projectName}/${file.originalname}`;
                try {
                    yield fs.promises.rename(oldPath, newPath);
                    console.log(`Renamed ${oldPath} to ${newPath}`);
                    const [id] = (yield database_1.default.query("SELECT project_id FROM projects WHERE name = ?", [projectName]));
                    const src = `/images/projects/${projectName}/${file.originalname}`;
                    const project_id = id[0].project_id;
                    const image_id = index;
                    yield database_1.default.query("INSERT INTO images (src, project_id, image_id) VALUES (?, ?, ?)", [src, project_id, image_id]);
                    res.location(`/images-id/?project=${projectName}&image_id=${image_id}`);
                }
                catch (err) {
                    console.error(err);
                    res.status(500).send(err);
                }
            }
            console.log("Uploaded Images", req.files);
            res.send("Files uploaded");
        });
    });
};
exports.uploadProjectImages = uploadProjectImages;
