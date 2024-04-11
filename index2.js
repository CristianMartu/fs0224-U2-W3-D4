const API_KEY = 'qqEpxYtbfLSWcwuU3D5gcS4Anhmt4pYjeiIhpp9wlkzAzSooW97ARTKA'
const params = new URLSearchParams(window.location.search)
const id = params.get('photos')

const URL = 'https://api.pexels.com/v1/photos/' + id

const createCard = (card) => {
  const row = document.querySelector('.album .container .row')
  const div = document.createElement('div')
  div.classList.add('col-md-8', 'mx-auto', 'colToHide')
  div.innerHTML = `
                <div class="card mb-4 shadow-sm">
                <a href="./pexels-detail.html?photos= ${card.id}">
                    <img
                        src= ${card.src.original}
                        class="bd-placeholder-img card-img-top"
                        height = "400px"
                    />
                </a>
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                    <a href="./pexels-detail.html?photos= ${card.id}">
                        <h5 class="card-title">${card.photographer}</h5>
                    </a>
                    <p class="card-text">
                        ${card.alt}
                    </p>
                    <p class="card-text">
                        <a href="${card.photographer_url}">Link Page</a>
                    </p>
                    </div>
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

window.onload = async () => {
  try {
    const resp = await fetch(URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
    const parsedBody = await resp.json()
    createCard(parsedBody)
  } catch (error) {
    console.log(error)
  }
}
