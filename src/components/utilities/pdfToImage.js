/* global  fabric */

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
export default pdfToImage
