"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProjectSubmit = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    project_id: joi_1.default.number().max(20).required().messages({
        "number.base": "⚠ The project_id must be a number.",
        "number.max": "⚠ Your project_id is too long.",
        "any.required": "⚠ A nice message is required.",
        "number.empty": "⚠ Please write the id.",
    }),
    name: joi_1.default.string().max(255).required().messages({
        "string.pattern.base": "⚠ Invalid name.",
        "any.required": "⚠ The name is required.",
        "string.empty": "⚠ Please state the name.",
    }),
    content: joi_1.default.string().max(1000).required().messages({
        "any.required": "⚠ The content is required.",
        "string.empty": "⚠ Please explain briefly the project.",
    }),
    tools: joi_1.default.string().max(500).required().messages({
        "string.empty": "⚠ Please mention which tools were used.",
        "any.required": "⚠ The tools are required.",
    }),
    packages: joi_1.default.string().max(500).messages({
        "string.empty": "⚠ Please mention which pcakges were used.",
    }),
    link: joi_1.default.string().max(1500).required().messages({
        "string.max": "⚠ Your link is too long.",
        "any.required": "⚠ A nice link is required.",
        "string.empty": "⚠ Please write the project link.",
    }),
    github: joi_1.default.string().max(1500).required().messages({
        "string.max": "⚠ Your link is too long.",
        "any.required": "⚠ A nice link is required.",
        "string.empty": "⚠ Please write the project link.",
    }),
    subTitle: joi_1.default.string().max(500).required().messages({
        "string.max": "⚠ Your subtitle is too long.",
        "any.required": "⚠ A nice subtitle is required.",
        "string.empty": "⚠ Please write a nice subtitle.",
    }),
    lg_content1: joi_1.default.string().max(1500).required().messages({
        "string.max": "⚠ Your content is too long.",
        "any.required": "⚠ A nice content is required.",
        "string.empty": "⚠ Please explain the firs phase of the project.",
    }),
    lg_content2: joi_1.default.string().max(1500).required().messages({
        "string.max": "⚠ Your content is too long.",
        "any.required": "⚠ A nice content is required.",
        "string.empty": "⚠ Please explain the second phase of the project.",
    }),
    aka: joi_1.default.string().max(250).required().messages({
        "string.max": "⚠ Your aka is too short.",
        "any.required": "⚠ A nice aka is required.",
        "string.empty": "⚠ Please write the as known as here.",
    }),
});
const validateProjectSubmit = (req, res, next) => {
    const { project_id, name, subTitle, content, lg_content1, lg_content2, tools, packages, link, github, aka, } = req.body;
    const { error } = userSchema.validate({
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
    }, { abortEarly: false });
    if (error) {
        res.status(422).json({ projectValidation: error });
        console.log("error details", error.details);
    }
    else {
        next();
    }
};
exports.validateProjectSubmit = validateProjectSubmit;
