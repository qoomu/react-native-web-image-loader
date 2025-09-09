"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImageWrapper = function (classPath, esModule) {
    if (esModule === void 0) { esModule = false; }
    return function (size, images) {
        var uri = "" + images['@1x'];
        delete images['@1x'];
        var scalings = [];
        for (var scaling in images) {
            scalings.push("\"uri" + scaling + "\": " + images[scaling] + ",");
        }
        return (esModule
            ? "import AdaptiveImage from " + classPath
            : "var AdaptiveImage = require(" + classPath + ").default") + ";\n\n" + (esModule ? 'export default' : 'module.exports =') + " new AdaptiveImage({\n    uri: " + uri + "," + scalings.join('') + "\n    width: " + size.width + ",\n    height: " + size.height + "\n});";
    };
};
