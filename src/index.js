let addToy = false;

document.addEventListener("DOMContentLoaded", () => {fetchAllToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchAllToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyArr => toyArr.forEach(createCards))
}
document.querySelector(".add-toy-form").addEventListener('submit', submitToy)
function submitToy(e){
  e.preventDefault()
  let toyObject = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
 
  addNewToy(toyObject)
  createCards(toyObject)
}

function addNewToy(toyObject){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObject)
  })
  .then(res => res.json())
}


function createCards(toy){
  let card = document.createElement('div')
  card.className = "card"
  card.innerHTML = `
  <img src="${toy.image}" class="toy-avatar">
  <div class="content">
    <h2>${toy.name}</h2>
    <p>${toy.likes}</p>
    <button class="like-btn" id="[toy_id]">Like ❤️</button>
  `
card.querySelector(".like-btn").addEventListener("click", () => {
toy.likes++
card.querySelector('p').textContent = toy.likes
updateLike(toy)
})
  let toyCollection = document.querySelector("#toy-collection")

  toyCollection.appendChild(card)
  
} 

// Count likes

function updateLike(toyObject){
  fetch(`http://localhost:3000/toys/${toyObject.id}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'
  },
  body: JSON.stringify(toyObject)
  }
  ).then(res => res.json())
  .then(animal => console.log(animal))
}