document.addEventListener("DOMContentLoaded", () => {
  const animalList = document.getElementById("animalList");
  const animalDetails = document.getElementById("animalDetails");
  const resetButton = document.getElementById("reset-button");
  const addAnimalForm = document.getElementById("add-animal-form");
  const animalNameInput = document.getElementById("animal-name-input");
  const animalImageInput = document.getElementById("animal-image-input");

  // Fetch data from the server
  fetch("http://localhost:3000/characters")
    .then(response => response.json())
    .then(data => {
      // Render animal list
      data.forEach(animal => {
        const animalItem = document.createElement("div");
        animalItem.classList.add("animal");
        animalItem.innerHTML = `
          <img src="${animal.image}" alt="${animal.name}">
          <span>${animal.name}</span>
        `;
        animalItem.addEventListener("click", () => {
          showAnimalDetails(animal);
        });
        animalList.appendChild(animalItem);
      });
    })
    .catch(error => {
      console.error("Error fetching animal data:", error);
    });

  function showAnimalDetails(animal) {
    animalDetails.innerHTML = `
      <h2>${animal.name}</h2>
      <img src="${animal.image}" alt="${animal.name}">
      <p>Votes: ${animal.votes}</p>
      <button class="vote-button" data-animal-id="${animal.id}">Vote</button>
    `;
    animalDetails.style.display = "block";
    const voteButton = animalDetails.querySelector(".vote-button");
    voteButton.addEventListener("click", () => addVote(animal));
  }

 // Function to add a vote for the selected animal
 function addVote(animal) {
    animal.votes++;
    showAnimalDetails(animal);
}

// Reset votes to 0 when the reset button is clicked
    resetButton.addEventListener("click", () => {
      const animalNames = animalList.querySelectorAll("div");
      animalNames.forEach(animalName => {
        const animalId = parseInt(animalName.dataset.animalId);
        const animal = data.find(animal => animal.id === animalId);
        if (animal) {
           animal.votes = 0;
        }
        });

        const selectedAnimal = animalDetails.querySelector("h2");
        if (selectedAnimal) {
            const animalId = parseInt(selectedAnimal.dataset.animalId);
            const animal = data.find(animal => animal.id === animalId);
            if (animal) {
                showAnimalDetails(animal);
            }
        }
    });

    // Add a new animal when the form is submitted
    addAnimalForm.addEventListener("submit", event => {
        event.preventDefault();
        const newAnimal = {
            id: data.length + 1,
            name: animalNameInput.value,
            image: animalImageInput.value,
            votes: 0
        };
        data.push(newAnimal);
        const newAnimalName = document.createElement("div");
        newAnimalName.innerText = newAnimal.name;
        newAnimalName.addEventListener("click", () => showAnimalDetails(newAnimal));
        animalList.appendChild(newAnimalName);
        addAnimalForm.reset();
    });
});