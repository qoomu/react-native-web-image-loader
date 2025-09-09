"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_size_1 = __importDefault(require("image-size"));
function default_1(path) {
    return image_size_1.default(path);
}
exports.default = default_1;
