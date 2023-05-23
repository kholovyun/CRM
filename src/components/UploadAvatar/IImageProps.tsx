export default interface IImageProps {
    image: File | string,
    allowZoomOut: boolean,
    position: {x: number, y: number},
    scale: number,
    rotate: number,
    borderRadius: number,
    preview: unknown,
    width: number,
    height: number
}