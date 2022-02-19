//Initialize//////////////////////////////////////////////
function initialize(){
    getRamen();

    onLoad();
}

initialize();

//Get Ramen////////////////////////////////////////////////
function getRamen(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramenData => ramenData.forEach(ramen => renderRamen(ramen)))
}

//Render Ramen/////////////////////////////////////////////
function renderRamen(ramen){
    renderImages(ramen);
}

//Render Images/////////////////////////////////////////////
function renderImages(ramen){
    let img = document.createElement('img')
    img.src = `${ramen.image}`
    document.querySelector('#ramen-menu').appendChild(img)

    let btn = document.createElement('button')
    btn.textContent = 'Delete'
    document.querySelector('#ramen-menu').appendChild(btn)

    btn.addEventListener('click', function(){
        img.remove()
        btn.remove()
    })

    //Click Images/////////////////////////////////////////////
    img.addEventListener('click', function(){

        //Remove ramen-detail nodes/////////////////////////////////////
        let ramenDetail = document.getElementById('ramen-detail')
        removeAllChildNodes(ramenDetail);

        //New ramen-detail nodes/////////////////////////////////////////////
        ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="Insert Name Here" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
        `

        //Add/Show Ramen Rating/////////////////////////////////////////////
        let ratingDisplay = document.getElementById('rating-display')
        ratingDisplay.innerText = `${ramen.rating}`

        //Add/Show Ramen Comment/////////////////////////////////////////////
        let ramenComment = document.getElementById('comment-display')
        ramenComment.innerText = `${ramen.comment}`
    })
}

//Remove ramen-detail nodes/////////////////////////////////////////////

function removeAllChildNodes(ramenDetail){
    while(ramenDetail.firstChild){
        ramenDetail.removeChild(ramenDetail.firstChild)
    }
}

//Submit New Ramen/////////////////////////////////////////////
let form = document.querySelector('#new-ramen')

form.addEventListener('submit', addNewRamen)

//Add New Ramen/////////////////////////////////////////////
function addNewRamen(e){
    e.preventDefault()
    
    let name = e.target.name.value
    let restaurant = e.target.restaurant.value
    let image = e.target.image.value
    let rating = e.target.rating.value
    let comment = document.getElementById('new-comment').value

    renderNewRamen(name, restaurant, image, rating, comment)

    form.reset()
}

//Render New Ramen/////////////////////////////////////////////
function renderNewRamen(name, restaurant, image, rating, comment){
    let img = document.createElement('img')
    img.src = `${image}`
    document.querySelector('#ramen-menu').appendChild(img)

    //Click Image/////////////////////////////////////////////
    img.addEventListener('click', function(){
        //Remove ramen-detail nodes/////////////////////////////////////
        let ramenDetail = document.getElementById('ramen-detail')
        removeAllChildNodes(ramenDetail);

        //New ramen-detail nodes/////////////////////////////////////////////
        ramenDetail.innerHTML = `
        <img class="detail-image" src="${image}" alt="Insert Name Here" />
        <h2 class="name">${name}</h2>
        <h3 class="restaurant">${restaurant}</h3>
        `

        //Add-Show Ramen Rating/////////////////////////////////////////////
        let ratingDisplay = document.getElementById('rating-display')
        ratingDisplay.innerText = `${rating}`

        //Add/Show Ramen Comment/////////////////////////////////////////////
        let ramenComment = document.getElementById('comment-display')
        ramenComment.innerText = `${comment}`
    })

}

//On Load Show First Ramen///////////////////////////////////
function onLoad(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(function(ramenData){
        let ramenOne = ramenData.find(element => element.id === 1)
        
        //Remove ramen-detail nodes/////////////////////////////////////
        let ramenDetail = document.getElementById('ramen-detail')
        removeAllChildNodes(ramenDetail);

        //First Ramen Image and Details Appear on Load/////////////////////////////////////////////
        ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramenOne.image}" alt="Insert Name Here" />
        <h2 class="name">${ramenOne.name}</h2>
        <h3 class="restaurant">${ramenOne.restaurant}</h3>
        `

        //Add-Show Ramen Rating/////////////////////////////////////////////
        let ratingDisplay = document.getElementById('rating-display')
        ratingDisplay.innerText = `${ramenOne.rating}`
        
        //Add/Show Ramen Comment/////////////////////////////////////////////
        let ramenComment = document.getElementById('comment-display')
        ramenComment.innerText = `${ramenOne.comment}`
    })
}

//Update Ramen////////////////////////////////////////////////////////
let updateForm = document.querySelector('#edit-ramen')

updateForm.addEventListener('submit', updateRamen)

function updateRamen(e){
    e.preventDefault()

    let newRating = e.target.rating.value
    let newComment = document.getElementById('edit-comment').value

    editRamen(newRating, newComment);

    updateForm.reset()
}

function editRamen(newRating, newComment){
    //Edit Ramen Rating/////////////////////////////////////////////
    let ratingDisplay = document.getElementById('rating-display')
    ratingDisplay.innerText = `${newRating}`
    
    //Add/Show Ramen Comment/////////////////////////////////////////////
    let ramenComment = document.getElementById('comment-display')
    ramenComment.innerText = `${newComment}`
}