"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var PI = Math.PI, max = Math.max, min = Math.min;
var ArcText = /** @class */ (function () {
    function ArcText(elm, splitter) {
        if (splitter === void 0) { splitter = undefined; }
        this.element = elm;
        this.originalHTML = this.element.innerHTML;
        var container = document.createElement('div');
        var fragment = document.createDocumentFragment();
        container.setAttribute('aria-label', this.element.innerText);
        container.style.position = 'relative';
        this.container = container;
        this.letters = utils_1.splitNode(this.element, splitter);
        this.letters.forEach(function (letter) { return fragment.appendChild(letter); });
        container.appendChild(fragment);
        this.element.innerHTML = '';
        this.element.appendChild(container);
        var _a = window.getComputedStyle(this.element), fontSize = _a.fontSize, lineHeight = _a.lineHeight;
        this.fontSize = parseFloat(fontSize);
        this.lineHeight = parseFloat(lineHeight) || this.fontSize;
        this.metrics = this.letters.map(utils_1.getRect);
        var totalWidth = this.metrics.reduce(function (sum, _a) {
            var width = _a.width;
            return sum + width;
        }, 0);
        this.minRadius = totalWidth / PI / 2 + this.lineHeight;
        this.dir = 1;
        this.isForceWidth = false;
        this.isForceHeight = true;
        this.radius = this.minRadius;
        this.invalidate();
    }
    ArcText.prototype.forceWidth = function (value) {
        if (value) {
            this.isForceWidth = value;
            this.invalidate();
            return this;
        }
        return this.isForceWidth;
    };
    ArcText.prototype.forceHeight = function (value) {
        if (value) {
            this.isForceHeight = value;
            this.invalidate();
            return this;
        }
        return this.isForceHeight;
    };
    /**
     * Sets the text direction. `1` is clockwise, `-1` is counter-clockwise.
     *
     * @name dir
     * @function
     * @instance
     * @memberof ArcText
     * @param  {number} value A new text direction.
     * @return {ArcText}   The current instance.
     *
     * @example
     * const arcText = new ArcText(document.getElementById('myElement'));
     *
     * // Set the direction to counter-clockwise.
     * arcText.dir(-1);
     *
     * // Set the direction to clockwise.
     * arcText.dir(1);
     */
    ArcText.prototype.direction = function (value) {
        if (value) {
            this.dir = value;
            this.invalidate();
            return this;
        }
        return this.dir;
    };
    /**
     * Gets the text radius in pixels. The default radius is the radius required
     * for the text to form a complete circle.
     *
     * @name radius
     * @function
     * @instance
     * @memberof ArcText
     * @return {number} The current text radius.
     *
     * @example
     * const arcText = new ArcText(document.getElementById('myElement'));
     *
     * arcText.radius();
     * //=> 150
     */
    ArcText.prototype.arc = function (value) {
        if (value) {
            this.radius = max(this.minRadius, value);
            this.invalidate();
            return this;
        }
        return this.radius;
    };
    /**
     * Removes the ArcText effect from the element, restoring it to its
     * original state.
     *
     * @return {ArcText} This instance.
     *
     * @example
     * const arcText = new ArcText(document.getElementById('myElement'));
     *
     * // Restore `myElement` to its original state.
     * arcText.destroy();
     */
    ArcText.prototype.destroy = function () {
        this.element.innerHTML = this.originalHTML;
        return this;
    };
    /**
     * Removes the ArcText effect from the element, restoring it to its
     * original state.
     *
     * @return {ArcText} This instance.
     *
     * @example
     * const arcText = new ArcText(document.getElementById('myElement'));
     *
     * // Restore `myElement` to its original state.
     * arcText.destroy();
     */
    ArcText.prototype.refresh = function () {
        return this.invalidate();
    };
    /**
     * Invalidates the current state and schedules a task to refresh the layout
     * in the next animation frame.
     *
     * @private
     *
     * @return {ArcText} This instance.
     */
    ArcText.prototype.invalidate = function () {
        var _this = this;
        // if(this.raf) {
        cancelAnimationFrame(this.raf);
        // }
        this.raf = requestAnimationFrame(function () {
            _this.render();
        });
        return this;
    };
    /**
     * Rotates and positions the letters.
     *
     * @private
     *
     * @return {ArcText} This instance.
     */
    ArcText.prototype.render = function () {
        var _this = this;
        var originY = this.dir === -1 ? -this.radius + this.lineHeight : this.radius;
        var origin = "center " + originY / this.fontSize + "em";
        var innerRadius = this.radius - this.lineHeight;
        var _a = utils_1.getLetterRotations(this.metrics, innerRadius), rotations = _a.rotations, θ = _a.θ;
        this.letters.forEach(function (letter, index) {
            var style = letter.style;
            var rotate = (θ * -0.5 + rotations[index]) * _this.dir;
            var translateX = (_this.metrics[index].width * -0.5) / _this.fontSize;
            var transform = "translateX(" + translateX + "em) rotate(" + rotate + "deg)";
            style.position = 'absolute';
            style.bottom = _this.dir === -1 ? '0' : 'auto';
            style.left = '50%';
            style.transform = transform;
            style.transformOrigin = origin;
            // style.webkitTransform = transform;
            // style.webkitTransformOrigin = origin;
        });
        if (this.isForceHeight) {
            var height = θ > 180 ? utils_1.sagitta(this.radius, θ) : utils_1.sagitta(innerRadius, θ) + this.lineHeight;
            this.container.style.height = height / this.fontSize + "em";
        }
        if (this.isForceWidth) {
            var width = utils_1.chord(this.radius, min(180, θ));
            this.container.style.width = width / this.fontSize + "em";
        }
        return this;
    };
    return ArcText;
}());
exports.default = ArcText;
//# sourceMappingURL=arc-text.js.map