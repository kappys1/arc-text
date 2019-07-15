"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitNode = function (node, splitter) {
    var wrapperElement = document.createElement('span');
    var text = node.innerText.trim();
    var chars = splitter ? splitter(text) : text.split('').slice();
    return chars.map(function (char) {
        var parent = wrapperElement.cloneNode();
        parent.insertAdjacentHTML('afterbegin', char === ' ' ? '&nbsp;' : char);
        return parent;
    });
};
exports.getRect = function (element) {
    var rect = element.getBoundingClientRect();
    return {
        height: rect.height,
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width
    };
};
var radiansPerDegree = Math.PI / 180;
var degreesPerRadian = 180 / Math.PI;
exports.chord = function (r, θ) { return 2 * r * Math.sin(exports.degreesToRadians(θ / 2)); };
exports.radiansToDegrees = function (angleInDegrees) { return angleInDegrees * degreesPerRadian; };
exports.degreesToRadians = function (angleInDegrees) { return angleInDegrees * radiansPerDegree; };
exports.sagitta = function (r, θ) { return r * (1 - Math.cos(exports.degreesToRadians(θ / 2))); };
exports.getLetterRotations = function (metrics, r) {
    return metrics.reduce(function (data, _a) {
        var width = _a.width;
        var rotation = exports.radiansToDegrees(width / r);
        return {
            θ: data.θ + rotation,
            rotations: data.rotations.concat([data.θ + rotation / 2])
        };
    }, { θ: 0, rotations: [] });
};
//# sourceMappingURL=utils.js.map