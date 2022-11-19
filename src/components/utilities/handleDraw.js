function handleDraw() {
  const drawCanvas = document.querySelector('#draw-sign')
  const ctx = drawCanvas.getContext('2d')
  ctx.lineWidth = 4
  ctx.lineCap = 'round'

  let isPainting = false
  function getPaintPosition(e) {
    const drawAreaSize = drawCanvas.getBoundingClientRect()
    if (e.type === 'mousemove') {
      return {
        x: e.clientX - drawAreaSize.left - drawCanvas.clientLeft,
        y: e.clientY - drawAreaSize.top,
      }
    } else {
      return {
        x: e.touches[0].clientX - drawAreaSize.left,
        y: e.touches[0].clientY - drawAreaSize.top,
      }
    }
  }
  function startPosition(e) {
    e.preventDefault()
    isPainting = true
  }

  function finishedPosition() {
    isPainting = false
    ctx.beginPath()
  }

  function draw(e) {
    if (!isPainting) return
    const paintPostion = getPaintPosition(e)
    ctx.lineTo(paintPostion.x, paintPostion.y)
    ctx.stroke()
  }

  drawCanvas.addEventListener('mousedown', startPosition)
  drawCanvas.addEventListener('mouseup', finishedPosition)
  drawCanvas.addEventListener('mouseleave', finishedPosition)
  drawCanvas.addEventListener('mousemove', draw)
  drawCanvas.addEventListener('touchstart', startPosition, { passive: true })
  drawCanvas.addEventListener('touchend', finishedPosition, { passive: true })
  drawCanvas.addEventListener('touchcancel', finishedPosition, {
    passive: true,
  })
  drawCanvas.addEventListener('touchmove', draw, { passive: true })
}
export default handleDraw
