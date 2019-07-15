export default class ArcText {
    private element;
    private originalHTML;
    private container;
    letters: HTMLElement[];
    private fontSize;
    private lineHeight;
    private metrics;
    private minRadius;
    private isForceWidth;
    private isForceHeight;
    private radius;
    private dir;
    private raf;
    constructor(elm: HTMLElement, splitter?: any);
    forceWidth(value: boolean): boolean | this;
    forceHeight(value: boolean): boolean | this;
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
    direction(value: number): number | this;
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
    arc(value: number): number | this;
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
    destroy(): this;
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
    refresh(): this;
    /**
     * Invalidates the current state and schedules a task to refresh the layout
     * in the next animation frame.
     *
     * @private
     *
     * @return {ArcText} This instance.
     */
    private invalidate;
    /**
     * Rotates and positions the letters.
     *
     * @private
     *
     * @return {ArcText} This instance.
     */
    private render;
}
