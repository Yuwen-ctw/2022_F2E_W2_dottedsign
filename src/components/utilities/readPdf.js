/* global  pdfjsLib */

function readPdf(file) {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = async function () {
      // 將 base64 中的前綴刪去，並進行解碼
      const Base64Prefix = 'data:application/pdf;base64,'
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
      const data = atob(reader.result.substring(Base64Prefix.length))
      const pdfDoc = await pdfjsLib.getDocument({ data }).promise
      // get total page
      const totalPage = pdfDoc.numPages
      let pdfDatabyPage = []
      pdfDatabyPage.fileName = file.name.replace(/\.\w*/, '')

      // slice data to array by page
      for (let i = 1; i <= totalPage; i++) {
        const pageData = await pdfDoc.getPage(i)
        pdfDatabyPage.push(pageData)
      }
      resolve(pdfDatabyPage)
    }
    reader.readAsDataURL(file)
  })
}
export default readPdf
