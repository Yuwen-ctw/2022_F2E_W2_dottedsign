/* global  pdfjsLib */
async function printPdf(pdfData) {
  const Base64Prefix = 'data:application/pdf;base64,'
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    // 將 base64 中的前綴刪去，並進行解碼
    'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
  const data = atob(pdfData.substring(Base64Prefix.length))
  // 利用解碼的檔案，載入 PDF 檔及第一頁
  const pdfDoc = await pdfjsLib.getDocument({ data }).promise
  const pdfPage = await pdfDoc.getPage(1)
  // 設定尺寸及產生 canvas

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

export default printPdf
