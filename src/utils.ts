import { IRect } from './interfaces'

export const splitNode = (node: HTMLElement, splitter: any) => {
  const wrapperElement = document.createElement('span')
  const text: string = node.innerText.trim()
  const chars = splitter ? splitter(text) : [...text.split('')]
  return chars.map((char: string) => {
    const parent: any = wrapperElement.cloneNode()
    parent.insertAdjacentHTML('afterbegin', char === ' ' ? '&nbsp;' : char)
    return parent
  })
}

export const getRect = (element: HTMLElement): IRect => {
  const rect = element.getBoundingClientRect()
  return {
    height: rect.height,
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width
  }
}

const radiansPerDegree = Math.PI / 180
const degreesPerRadian = 180 / Math.PI
export const chord = (r: number, θ: any) => 2 * r * Math.sin(degreesToRadians(θ / 2))
export const radiansToDegrees = (angleInDegrees: number) => angleInDegrees * degreesPerRadian
export const degreesToRadians = (angleInDegrees: number) => angleInDegrees * radiansPerDegree
export const sagitta = (r: number, θ: any) => r * (1 - Math.cos(degreesToRadians(θ / 2)))
export const getLetterRotations = (metrics: any, r: number) =>
  metrics.reduce(
    (data: any, { width }: any) => {
      const rotation = radiansToDegrees(width / r)
      return {
        θ: data.θ + rotation,
        rotations: data.rotations.concat([data.θ + rotation / 2])
      }
    },
    { θ: 0, rotations: [] }
  )
