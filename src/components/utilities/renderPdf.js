async function renderPdf(page, canvas) {
  // 此處 canvas 套用 fabric.js
  canvas.requestRenderAll()
  const pdf = await printPdf(page)
  const pdfImage = await pdfToImage(pdf)
  // 透過比例設定 canvas 尺寸
  canvas.setWidth(pdfImage.width / window.devicePixelRatio)
  canvas.setHeight(pdfImage.height / window.devicePixelRatio)
  // 將 PDF 畫面設定為背景
  canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
}

export default renderPdf

async function printPdf(pdfPage) {
  const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  // 設定 PDF 所要顯示的寬高及渲染
  canvas.height = viewport.height
  canvas.width = viewport.width
  const renderContext = {
    canvasContext: context,
    viewport,
  }

  const renderTask = pdfPage.render(renderContext)
  // 回傳做好的 PDF canvas
  return renderTask.promise.then(() => canvas)
}

function pdfToImage(pdfData) {
  // 設定 PDF 轉為圖片時的比例
  const scale = 1 / window.devicePixelRatio
  // 回傳圖片
  return new fabric.Image(pdfData, {
    id: 'renderPDF',
    scaleX: scale,
    scaleY: scale,
  })
}
