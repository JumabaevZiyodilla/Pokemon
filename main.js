const elForm = document.querySelector(".pokemon-form");
const elInput = document.querySelector(".pokemon-input");
const elPokemonList = document.querySelector(".pokemon_list")
const elTemplate = document.querySelector(".template").content;
const elPokemonSelect = document.querySelector(".pokemon-select");
const fragmentPokemon = document.createDocumentFragment();

const elMinCandyCount = document.querySelector(".pokemon-min-year");
const elMaxCandyCount = document.querySelector(".pokemon-max-year");


function renderPokemon(pokemon, regex = "") {
    elPokemonList.innerHTML = ""
    
    pokemon.forEach(elPoke => {
        // TEMPLATENING ICHIDAGI BARCHA ELEMENTLARNI CHIQARIB OLAMIZ
        const pokemonFragmentClone = elTemplate.cloneNode(true);

        if (regex.source != "(?:)" && regex) {
            pokemonFragmentClone.querySelector(".pokemon__title").innerHTML = elPoke.name.replace(regex, `<mark class = "bg-warning mark">${regex.source.toLowerCase()}</mark>`);
        } else {
            pokemonFragmentClone.querySelector(".pokemon__title").textContent = elPoke.name;
        }
        // FRAGMENTCLONE NI ICHIDAGI BARCHA ELEMENTLARGA TEXT CONTENT BERAMIZ
        // pokemonFragmentClone.querySelector(".pokemon__title").textContent = elPoke.name;
        pokemonFragmentClone.querySelector(".pokemon__img").src = elPoke.img;
        
        pokemonFragmentClone.querySelector(".pokemon__span").textContent = elPoke.num;
        pokemonFragmentClone.querySelector(".pokemon__text").textContent = elPoke.type.join(", ");
        pokemonFragmentClone.querySelector(".pokemon__time").textContent = elPoke.spawn_time;
        fragmentPokemon.appendChild(pokemonFragmentClone);
    })
    elPokemonList.appendChild(fragmentPokemon);
}

// SELECT WEAKNESS
const pokemonType = [];
const pokemonTypeValue = [];
function selectValue(){
    pokemons.forEach(item =>{
        pokemonType.push(item.weaknesses);
        pokemonType.forEach(element => {
            element.forEach(item =>{
                if(!pokemonTypeValue.includes(item)){
                    pokemonTypeValue.push(item);
                }
            })
        })
        
    })
}



selectValue();

// CREATE SELECT ELEMENTS
function selectCreate(){
    const selectFragment = document.createDocumentFragment();
    pokemonTypeValue.forEach(element => {
        const elOption = document.createElement("option");
        elOption.value = element
        elOption.textContent = element
        selectFragment.appendChild(elOption);
    })
    elPokemonSelect.appendChild(selectFragment);
};

selectCreate();

// SELECT SORT
const elSelectSort = document.querySelector(".pokemon-sort");

function selectSort(filterArray,selectValue){
    if(selectValue == "a-z"){
        filterArray.sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
    }if(selectValue == "z-a"){
        filterArray.sort((a,b) => b.name.charCodeAt(0) - a.name.charCodeAt(0))
    }if(selectValue == "thin-thick"){
        filterArray.sort((a,b) => a.weight.charCodeAt() - b.weight.charCodeAt());
    }
    if(selectValue == "thick-thin"){
        filterArray.sort((a,b) => b.weight.charCodeAt(0) - a.weight.charCodeAt(0));
    }
}
elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();

    const elInputValue = elInput.value.trim();
    const regexInputValue = new RegExp(elInputValue, "gi");
    
    let searchPokemon = pokemons.filter(item => {
        return item.name.match(regexInputValue) && (elPokemonSelect.value == "All" || item.weaknesses.includes(elPokemonSelect.value)) && (elMinCandyCount.value == "" || item.candy_count >= elMinCandyCount.value) && (elMaxCandyCount.value == "" || item.candy_count <= elMaxCandyCount.value);
    })
    if(searchPokemon.length > 0){
        selectSort(searchPokemon,elSelectSort.value)
        renderPokemon(searchPokemon,regexInputValue);
    }else{
        elPokemonList.innerHTML = "Pokemon not found!"
    }
})
renderPokemon(pokemons)
