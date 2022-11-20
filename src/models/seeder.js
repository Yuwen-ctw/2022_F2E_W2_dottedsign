const data = [
  {
    dataURL: 'data:image/png;base64,........',
    fileName: 'image1',
    id: 7279,
    timeStamp: '2021/7/20',
  },
  {
    dataURL: 'data:image/png;base64,........',
    fileName: 'test02',
    id: 7262,
    timeStamp: '2022/7/27',
  },
  {
    dataURL: 'data:image/png;base64,........',
    fileName: 'fakefile03',
    id: 7263,
    timeStamp: '2020/6/21',
  },
  {
    dataURL: 'data:image/png;base64,........',
    fileName: 'nodata04',
    id: 7264,
    timeStamp: '2021/8/5',
  },
  {
    dataURL: 'data:image/png;base64,........',
    fileName: 'success05',
    id: 7265,
    timeStamp: '2022/11/2',
  },
]

function runSeeder() {
  localStorage.setItem('signHistory', JSON.stringify(data))
}

export default runSeeder
