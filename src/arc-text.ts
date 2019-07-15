import { IRect } from './interfaces'
import { splitNode, getRect, chord, sagitta, getLetterRotations } from './utils'

const { PI, max, min } = Math

export default class ArcText {
  private element: HTMLElement
  private originalHTML: string
  private container: HTMLElement
  public letters: HTMLElement[]

  private fontSize: number
  private lineHeight: number
  private metrics: IRect[]
  private minRadius: number
  private isForceWidth: boolean
  private isForceHeight: boolean
  private radius: number
  private dir: number
  private raf: any

  constructor(elm: HTMLElement, splitter: any = undefined) {
    this.element = elm
    this.originalHTML = this.element.innerHTML

    const container = document.createElement('div')
    const fragment = document.createDocumentFragment()
    container.setAttribute('aria-label', this.element.innerText)
    container.style.position = 'relative'
    this.container = container

    this.letters = splitNode(this.element, splitter)
    this.letters.forEach((letter: any) => fragment.appendChild(letter))
    container.appendChild(fragment)

    this.element.innerHTML = ''
    this.element.appendChild(container)

    const { fontSize, lineHeight }: any = window.getComputedStyle(this.element)

    this.fontSize = parseFloat(fontSize)
    this.lineHeight = parseFloat(lineHeight) || this.fontSize
    this.metrics = this.letters.map(getRect)

    const totalWidth = this.metrics.reduce((sum: any, { width }: IRect) => sum + width, 0)
    this.minRadius = totalWidth / PI / 2 + this.lineHeight

    this.dir = 1
    this.isForceWidth = false
    this.isForceHeight = true
    this.radius = this.minRadius

    this.invalidate()
  }

  public forceWidth(value: boolean) {
    if (value) {
      this.isForceWidth = value

      this.invalidate()

      return this
    }

    return this.isForceWidth
  }

  public forceHeight(value: boolean) {
    if (value) {
      this.isForceHeight = value

      this.invalidate()

      return this
    }

    return this.isForceHeight
  }

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
  public direction(value: number) {
    if (value) {
      this.dir = value
      this.invalidate()
      return this
    }
    return this.dir
  }

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
  public arc(value: number) {
    if (value) {
      this.radius = max(this.minRadius, value)
      this.invalidate()
      return this
    }

    return this.radius
  }

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
  public destroy() {
    this.element.innerHTML = this.originalHTML
    return this
  }

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
  public refresh() {
    return this.invalidate()
  }

  /**
   * Invalidates the current state and schedules a task to refresh the layout
   * in the next animation frame.
   *
   * @private
   *
   * @return {ArcText} This instance.
   */
  private invalidate() {
    // if(this.raf) {
    cancelAnimationFrame(this.raf)
    // }
    this.raf = requestAnimationFrame(() => {
      this.render()
    })

    return this
  }

  /**
   * Rotates and positions the letters.
   *
   * @private
   *
   * @return {ArcText} This instance.
   */
  private render() {
    const originY = this.dir === -1 ? -this.radius + this.lineHeight : this.radius
    const origin = `center ${originY / this.fontSize}em`
    const innerRadius = this.radius - this.lineHeight
    const { rotations, θ } = getLetterRotations(this.metrics, innerRadius)

    this.letters.forEach((letter, index) => {
      const { style } = letter
      const rotate = (θ * -0.5 + rotations[index]) * this.dir
      const translateX = (this.metrics[index].width * -0.5) / this.fontSize
      const transform = `translateX(${translateX}em) rotate(${rotate}deg)`

      style.position = 'absolute'
      style.bottom = this.dir === -1 ? '0' : 'auto'
      style.left = '50%'
      style.transform = transform
      style.transformOrigin = origin
      // style.webkitTransform = transform;
      // style.webkitTransformOrigin = origin;
    })

    if (this.isForceHeight) {
      const height = θ > 180 ? sagitta(this.radius, θ) : sagitta(innerRadius, θ) + this.lineHeight

      this.container.style.height = `${height / this.fontSize}em`
    }

    if (this.isForceWidth) {
      const width = chord(this.radius, min(180, θ))

      this.container.style.width = `${width / this.fontSize}em`
    }

    return this
  }
}
