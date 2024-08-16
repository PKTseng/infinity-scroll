const loading = document.getElementById('loading')
const imageContainer = document.getElementById('image-container')
let photosArray = []
let totalImages = 0
let imagesLoaded = 0
let ready = false

// unsplash api
const count = 10
const apiKey = 'J6_G11oOdf7by-p6W5PGsaSHp-QCDbwhljRlA94XsMM'
const baseURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// 設定 loading 狀態
function imageLoading() {
  imagesLoaded++

  if (imagesLoaded === totalImages) {
    ready = true
    loading.hidden = true
    console.log('ready =', ready)
  }
}

// 設定元素屬性
function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key])
  }
}

// 抓取 DOM 元素並將資料入頁面
function displayPhotos() {
  imagesLoaded = 0
  console.log('totalImages =', totalImages)
  totalImages = photosArray.length
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

    // 加入 loading 狀態
    img.addEventListener('load', imageLoading)

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

// scroll event
window.addEventListener('scroll', () => {
  const scrollPosition = window.innerHeight + window.scrollY
  const documentHeight = document.body.offsetHeight - 1000

  if (scrollPosition >= documentHeight && ready) {
    console.log('load more')
    ready = false

    loading.hidden = false
    getPhotos()
  }
})

getPhotos()
