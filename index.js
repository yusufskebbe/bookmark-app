const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')
const buttonModal = document.getElementById('btn')

// array of bookmarks

let bookmarks = [];

// Show Modal 
function showModal() {

  modal.classList.add('show-modal')
  websiteNameEl.focus();
}

function closeModal() {
  modal.classList.remove('show-modal')
}



// modal event listener
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', closeModal)
window.addEventListener('click', (e) => {

  e.target == modal ? modal.classList.remove('show-modal') : false

})

// validate form

function validate(nameValue, urlValue) {

  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert('please submit values for both fields')
    return false
  }
  if (!urlValue.match(regex)) {
    alert('please provide a valid web address')
    return false
  }
  return true

}

// Build Bookmarks DOM

function deletebookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1)
    }
  })
  // Update localstorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  fetchBookmarks();
}



function buildBookmarks() {


  bookmarksContainer.textContent = ""

  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    //item
    const item = document.createElement('div')
    item.classList.add('item')
    //Close icon
    const closeIcon = document.createElement('i')
    closeIcon.classList.add('fas', 'fa-times')


    closeIcon.setAttribute('onclick', `deletebookmark('${url}')`)

    //favicon / Link Container
    const linkInfo = document.createElement('div')
    linkInfo.classList.add('name')

    // Favicon 
    const favIcon = document.createElement('img')
    favIcon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
    favIcon.setAttribute('alt', "Favicon")

    //link
    const link = document.createElement('a')
    link.setAttribute('href', `${url}`)

    link.setAttribute('target', '_blank')

    link.textContent = name

    // Append to bookmark container

    linkInfo.append(favIcon, link)
    item.append(closeIcon, linkInfo)
    bookmarksContainer.appendChild(item)

  })
}





// fetch from local storage

function fetchBookmarks() {
  // Get bookmarks from storage if available

  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  } else {
    // Create bookmarks in local storage
    bookmarks = [
      {
        name: 'Yusuf Kebbe',
        url: 'https://skyturkiye.net'
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  buildBookmarks()

}



// Handle Data 

function storeBookmark(e) {
  e.preventDefault()
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);
  if (!validate(nameValue, urlValue)) {
    return false
  }
  const bookmark = {
    name: nameValue,
    url: urlValue
  }

  bookmarks.push(bookmark)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  fetchBookmarks()
  bookmarkForm.reset();
  modal.classList.remove('show-modal')
}


// event listener 

bookmarkForm.addEventListener('submit', storeBookmark)
fetchBookmarks()