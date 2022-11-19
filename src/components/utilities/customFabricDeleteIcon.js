/* global fabric */
import fabricDelIcon from '../../images/fabricDel.png'
function customFabricDeleteIcon() {
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 20,
  })
}
function deleteObject(event, transform) {
  const target = transform.target
  const canvas = target.canvas
  canvas.remove(target)
  canvas.requestRenderAll()
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  const img = document.createElement('img')
  const size = this.cornerSize
  img.src = fabricDelIcon

  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  ctx.drawImage(img, -size / 2, -size / 2, size, size)
  ctx.restore()
}

export default customFabricDeleteIcon
