const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

// Show Modal 
function showModal() {

  modal.classList.add('show-modal')
  websiteNameEl.focus();
}

function closeModal() {
  modal.classList.remove('show-modal')
}

// event listener
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', closeModal)
window.addEventListener('click', (e) => {

  e.target == modal ? modal.classList.remove('show-modal') : false

})