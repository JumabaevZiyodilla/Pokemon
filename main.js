const elForm = document.querySelector(".pokemon-form");
const elInput = document.querySelector(".pokemon-input");
const elPokemonList = document.querySelector(".pokemon_list")
const elTemplate = document.querySelector(".template").content;
const fragmentPokemon = document.createDocumentFragment();

function renderPokemon(pokemon) {
    elPokemonList.innerHTML = ""
    
    pokemon.forEach(elPoke => {
        // TEMPLATENING ICHIDAGI BARCHA ELEMENTLARNI CHIQARIB OLAMIZ
        const pokemonFragmentClone = elTemplate.cloneNode(true);

        // FRAGMENTCLONE NI ICHIDAGI BARCHA ELEMENTLARGA TEXT CONTENT BERAMIZ
        pokemonFragmentClone.querySelector(".pokemon__title").textContent = elPoke.name;
        pokemonFragmentClone.querySelector(".pokemon__img").src = elPoke.img;
        pokemonFragmentClone.querySelector(".pokemon__title").textContent = elPoke.name;
        pokemonFragmentClone.querySelector(".pokemon__span").textContent = elPoke.num;
        pokemonFragmentClone.querySelector(".pokemon__text").textContent = elPoke.type.join(", ");
        pokemonFragmentClone.querySelector(".pokemon__time").textContent = elPoke.spawn_time;


        fragmentPokemon.appendChild(pokemonFragmentClone);

    })
    elPokemonList.appendChild(fragmentPokemon);
    
}
renderPokemon(pokemons)

elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();

    const elInputValue = elInput.value.trim();
    const regexInputValue = new RegExp(elInputValue, "gi");
    
    let searchPokemon = pokemons.filter(item => {
        return item.name.match(regexInputValue);
    })
    if(searchPokemon.length > 0){
        renderPokemon(searchPokemon);
    }else{
        elPokemonList.innerHTML = "Pokemon not found!"
    }
})


// var newPokemonItem = document.createElement("li");
// var newPokemonTitle = document.createElement("h3");
// var newPokemonImg = document.createElement("img");
// var newPokemonSpan = document.createElement("span");
// var newPokemonText = document.createElement("text");
// var newPokemonTime = document.createElement("time");

// newPokemonTitle.textContent = i.name;
// newPokemonImg.src = i.img;
// newPokemonSpan.textContent = i.num;
// newPokemonText.textContent = i.type.join(" ");
// newPokemonTime.textContent = i.spawn_time;

// newPokemonItem.classList.add("pokemon__item");
// newPokemonTitle.classList.add("pokemon__title")
// newPokemonImg.width = "200";
// newPokemonImg.height = "200";
// newPokemonSpan.classList.add("pokemon__span");
// newPokemonText.classList.add("pokemon__text");
// newPokemonTime.classList.add("pokemon__time");

// newPokemonItem.appendChild(newPokemonTitle);
// newPokemonItem.appendChild(newPokemonImg);
// newPokemonItem.appendChild(newPokemonSpan);
// newPokemonItem.appendChild(newPokemonTime);
// newPokemonItem.appendChild(newPokemonText);
// pokemonList.appendChild(newPokemonItem);
