"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Viewer = () => {
    return react_1.default.createElement("div", { id: "3d-viewer" }, "3D Viewer (TypeScript)");
};
exports.default = Viewer;
