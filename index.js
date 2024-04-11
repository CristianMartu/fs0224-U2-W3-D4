const URL_1 = 'https://api.pexels.com/v1/search?query=dog&per_page=9'
const URL_2 = 'https://api.pexels.com/v1/search?query=motorcycles&per_page=9'
const URL_LABEL = 'https://api.pexels.com/v1/search?query='
const API_KEY = 'qqEpxYtbfLSWcwuU3D5gcS4Anhmt4pYjeiIhpp9wlkzAzSooW97ARTKA'

const editHide = () => {
  const listBtnEdit = document.querySelectorAll('.btn-outline-secondary')
  listBtnEdit.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.colToHide').remove()
    })
  })
}

const createCard = (card) => {
  const row = document.querySelector('.album .container .row')
  const div = document.createElement('div')
  div.classList.add('col-md-4', 'colToHide')
  div.innerHTML = `
            <div class="card mb-4 shadow-sm">
            <img
                src= ${card.src.original}
                class="bd-placeholder-img card-img-top"
                height = "450px"
            />
            <div class="card-body">
                <h5 class="card-title">Lorem Ipsum</h5>
                <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                </p>
                <div
                class="d-flex justify-content-between align-items-center"
                >
                <div class="btn-group">
                    <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    >
                    View
                    </button>
                    <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    >
                    Hide
                    </button>
                </div>
                <small class="text-muted">${card.photographer_id}</small>
                </div>
            </div>
            </div> 
    `
  row.appendChild(div)
}

const createAlbum = (list) => {
  const posCol = document.querySelectorAll('.album .container .row .col-md-4')
  if (posCol.length > 0) {
    posCol.forEach((element) => {
      element.remove()
    })
  }
  list.forEach((element) => {
    createCard(element)
  })
  editHide()
}

const handleBtn = async (url) => {
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer [${API_KEY}]`,
      },
    })
    const parsedBody = await resp.json()
    createAlbum(parsedBody.photos)
    editHide()
  } catch (error) {
    console.log(error)
  }
}

const handleSubmit = (event) => {
  event.preventDefault()
  const input = document.getElementById('inputText')
  console.log(URL_LABEL + input.value)
  const url = URL_LABEL + input.value
  handleBtn(url)
}

window.onload = () => {
  const form = document.getElementById('myForm')
  const btn1 = document.querySelector('.btn-primary')
  const btn2 = document.querySelector('.btn-secondary')
  btn1.addEventListener('click', () => handleBtn(URL_1))
  btn2.addEventListener('click', () => handleBtn(URL_2))
  form.addEventListener('submit', handleSubmit)
}
