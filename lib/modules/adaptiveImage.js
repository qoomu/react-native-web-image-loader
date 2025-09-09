"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdaptiveImage = (function () {
    function AdaptiveImage(img) {
        this.data = img;
    }
    Object.defineProperty(AdaptiveImage.prototype, "uri", {
        get: function () {
            if (typeof window !== 'undefined' &&
                typeof window.devicePixelRatio !== 'undefined') {
                if (window.devicePixelRatio > 2 && this.data['uri@3x']) {
                    return this.data['uri@3x'];
                }
                else if (window.devicePixelRatio > 1 && this.data['uri@2x']) {
                    return this.data['uri@2x'];
                }
            }
            return this.data.uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdaptiveImage.prototype, "width", {
        get: function () {
            return this.data.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdaptiveImage.prototype, "height", {
        get: function () {
            return this.data.height;
        },
        enumerable: true,
        configurable: true
    });
    AdaptiveImage.prototype.toString = function () {
        return this.uri;
    };
    AdaptiveImage.prototype.toJSON = function () {
        return this.data;
    };
    return AdaptiveImage;
}());
exports.default = AdaptiveImage;
