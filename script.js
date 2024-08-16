const loading = document.getElementById('loading')
const imageContainer = document.getElementById('image-container')
let photosArray = []

// unsplash api
const count = 10
const apiKey = 'B95uhSaFJS3TpvI6FltGY8NCmbBS-tu5o8SKxzTFQRU'
const baseURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// 抓取 DOM 元素並將資料入頁面
function displayPhotos() {
  photosArray.forEach((photo) => {
    // 建立 a 標籤並設定 href 屬性

    const item = document.createElement('a')
    item.setAttribute('href', photo.links.html)
    item.setAttribute('target', '_blank')

    // 建立 img 標籤並設定 src 屬性
    const img = document.createElement('img')
    img.setAttribute('src', photo.urls.regular)
    img.setAttribute('alt', photo.alt_description)
    img.setAttribute('title', photo.alt_description)

    // 將 img 標籤放入 a 標籤
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(baseURL)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    console.log(error)
  }
}

getPhotos()
