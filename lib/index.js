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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var loader_utils_1 = __importDefault(require("loader-utils"));
var schema_utils_1 = __importDefault(require("schema-utils"));
var imageSizeResolver_1 = __importDefault(require("./modules/imageSizeResolver"));
var scaledImageResolver_1 = __importDefault(require("./modules/scaledImageResolver"));
var imageWrapper_1 = require("./modules/imageWrapper");
var options_json_1 = __importDefault(require("./options.json"));
var readFileAsync = util_1.promisify(fs_1.default.readFile);
var DEFAULT_IMAGE_CLASS_PATH = require.resolve('./modules/adaptiveImage');
var DEFAULT_IMAGE_NAME_FORMAT = '[hash].[ext]';
var DEFAULT_SCALINGS = { '@2x': 2, '@3x': 3 };
function default_1(content) {
    return __awaiter(this, void 0, void 0, function () {
        var callback, options, esModule, nameFormat, scalings, size, wrapImage, url, outputPath, imgUrls, resolvedFiles_1, e_1, publicImagePaths, key, _a, url_1, outputPath_1, publicPath, result;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    callback = this.async();
                    options = loader_utils_1.default.getOptions(this);
                    schema_utils_1.default(options_json_1.default, options, {
                        name: 'React Native Web Image Loader',
                        baseDataPath: 'options',
                    });
                    esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;
                    nameFormat = options.name || DEFAULT_IMAGE_NAME_FORMAT;
                    scalings = options.scalings || DEFAULT_SCALINGS;
                    size = imageSizeResolver_1.default(this.resourcePath);
                    wrapImage = imageWrapper_1.createImageWrapper(loader_utils_1.default.stringifyRequest(this, options.imageClassPath || DEFAULT_IMAGE_CLASS_PATH), esModule);
                    url = loader_utils_1.default.interpolateName(this, nameFormat, {
                        context: this.context,
                        content: content,
                    });
                    outputPath = url;
                    if (options.outputPath) {
                        outputPath = path_1.default.posix.join(options.outputPath, url);
                    }
                    imgUrls = {
                        '@1x': { url: url, outputPath: outputPath },
                    };
                    this.emitFile(outputPath, content);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4, scaledImageResolver_1.default(this.resourcePath, scalings)];
                case 2:
                    resolvedFiles_1 = _b.sent();
                    return [4, Promise.all(Object.keys(resolvedFiles_1).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var fileContent, fileName, outputPath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, readFileAsync(resolvedFiles_1[key])];
                                    case 1:
                                        fileContent = _a.sent();
                                        fileName = loader_utils_1.default.interpolateName(this, nameFormat, {
                                            context: this.context,
                                            content: fileContent,
                                        });
                                        outputPath = fileName;
                                        if (options.outputPath) {
                                            outputPath = path_1.default.posix.join(options.outputPath, fileName);
                                        }
                                        this.emitFile(outputPath, fileContent);
                                        imgUrls["@" + scalings[key] + "x"] = { url: fileName, outputPath: outputPath };
                                        return [2];
                                }
                            });
                        }); }))];
                case 3:
                    _b.sent();
                    return [3, 5];
                case 4:
                    e_1 = _b.sent();
                    console.error(e_1);
                    return [3, 5];
                case 5:
                    publicImagePaths = {};
                    for (key in imgUrls) {
                        _a = imgUrls[key], url_1 = _a.url, outputPath_1 = _a.outputPath;
                        publicPath = "__webpack_public_path__ + " + JSON.stringify(outputPath_1);
                        if (options.publicPath) {
                            if (typeof options.publicPath === 'function') {
                                publicPath = options.publicPath(url_1, this.resourcePath);
                            }
                            else {
                                publicPath = "" + (options.publicPath.endsWith('/')
                                    ? options.publicPath
                                    : options.publicPath + "/") + url_1;
                            }
                            publicPath = JSON.stringify(publicPath);
                        }
                        publicImagePaths[key] = publicPath;
                    }
                    result = wrapImage(size, publicImagePaths);
                    callback(null, result);
                    return [2];
            }
        });
    });
}
exports.default = default_1;
exports.raw = true;
