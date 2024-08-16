const loading = document.getElementById('loading')
const imageContainer = document.getElementById('image-container')
let photosArray = []

// unsplash api
const count = 10
const apiKey = 'B95uhSaFJS3TpvI6FltGY8NCmbBS-tu5o8SKxzTFQRU'
const baseURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// 設定元素屬性
function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key])
  }
}

// 抓取 DOM 元素並將資料入頁面
function displayPhotos() {
  photosArray.forEach((photo) => {
    // 建立 a 標籤並設定 href 屬性

    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    // 建立 img 標籤並設定 src 屬性
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

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
