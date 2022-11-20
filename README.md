# 2022 F2E W2 - 今晚，我想來點點簽

<img src='./public/screen.jpg'>

UI 設計 - <a href="https://2022.thef2e.com/users/12061579703802991521" target="_blank">K-T</a>

設計稿 - <a href="https://www.figma.com/file/6ZjDFQSrwRy6OUAXDmJNhz/%E5%B0%8F%E7%B6%A0%E7%B0%BD?node-id=0%3A1&t=BbwcZ9Y2ryDUlpZi-0" target="_blank">Figma</a>

<br>
<br>

## 使用方式

1. 打開終端機，Clone 專案至本機
<pre><code>git clone https://github.com/Yuwen-ctw/2022_F2E_W2_dottedsign.git</code></pre>
2. 進入專案資料夾
<pre><code>cd 2022_F2E_W2_dottedsign</code></pre>
3. 安裝 npm 套件
<pre><code>npm install</code></pre>
4. 啟動專案
<pre><code>npm start</code></pre>
5. 成功後會自動開啟頁面於 http://localhost:3000

## 功能

- 首頁 -
  1. 可以上傳 PDF 檔
  2. 可以觀看歷史簽署紀錄 (目前僅透過 Local Storage 列出清單)
- 建立簽名頁面
  1. 可於頁面上自製簽名，顏色可為黑色、藍色及紅色三種
  2. 可點擊清除鍵重新簽名
  3. 亦切換為匯入 PNG 檔
- 插入簽名頁面

  1. 可切換 PDF 頁碼
  2. 工具列 - 簽名: 彈出視窗並列出歷史簽名檔，可選擇本次欲使用的簽名 (儲存於 Local Storage)
  3. 工具列 - 勾選: 建立「V」勾選符號
  4. 工具列 - 日期: 建立當下日期
  5. 工具列 - 插入文字: 彈出視窗並可自行輸入欲插入的文字

     > > 以上建立之物件均可移動、放大或刪除

  6. 點擊「完成簽署」後鎖定畫面以防止誤處理，並顯示儲存
  7. 點擊「儲存」後自動下載

## 資料夾說明

- ./src/image - 圖片放置處
- ./src/scss - 樣式放置處
- ./src/models - 資料放置處 (含 2 張簽名 PNG 檔、 3 份 PDF 檔 ，及建立歷史資料的 JS 檔)
- ./src/components - React 元件放置處

## 相關技術

- GSAP - 滾動效果
- lodash - throttle

## 開發工具

- creat-react-app - 框架
- SCSS - CSS 預處理
- pdfjs-dist - 解析與渲染 PDF 檔
- fabric - 與 canvas 互動
- jspdf - 建立 PDF
- lottie-react - 讓 JSON 檔動起來
- ESLint - 協助除錯
