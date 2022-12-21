///////////////////////////////////////////////////////////////////////////////
// DISPLAY RENDERING
///////////////////////////////////////////////////////////////////////////////
function renderAllRamens(ramens) {
    const dispArea = document.getElementById("ramen-menu");
    dispArea.innerHTML = ""; // Remove placeholder

    ramens.forEach(ramen => {
        let img = document.createElement("img");
        img.id = ramen.id;
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", getRamen);
        img.addEventListener("error", setComingSoon);

        dispArea.append(img);
    });

    
    renderRamen(ramens[0]);
}

function renderRamen(ramen) {
    // Img needs a bit more effort to setup
    const img = document.querySelector("#ramen-detail img");
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener("error", setComingSoon);
    
    document.querySelector("#ramen-detail h2").textContent = ramen.name;
    document.querySelector("#ramen-detail h3").textContent = ramen.restaurant;
    document.querySelector("#rating-display").textContent = ramen.rating;
    document.querySelector("#comment-display").textContent = ramen.comment;
}

function appendRamen(ramen) {
    const dispArea = document.getElementById("ramen-menu");
    const img = document.createElement("img");
    img.id = ramen.id;
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener("click", getRamen);
    img.addEventListener("error", setComingSoon);

    dispArea.append(img);
}
///////////////////////////////////////////////////////////////////////////////
// EVENT HANDLING
///////////////////////////////////////////////////////////////////////////////
function getRamen(e) {
    getJSON(`http://localhost:3000/ramens/${e.target.id}`, renderRamen);
}

// TODO: Refactor ramen.comment away from form["new-comment"].value
function formSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const ramen = {
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: form["new-comment"].value
    }

    appendRamen(ramen);
    renderRamen(ramen);

    postJSON("http://localhost:3000/ramens", ramen, console.log("POSTED"));
}

function setComingSoon(e) {
    console.log(`Image src: '${e.target.src}' NOT FOUND. Substituting 'comingsoon.png'.`);
    e.target.src = "./assets/ramen/comingsoon.png";
}

///////////////////////////////////////////////////////////////////////////////
// DATA FETCHING
///////////////////////////////////////////////////////////////////////////////
function getJSON(url = "", callback) {
    fetch(url)
    .then((response) => response.json())
    //.then((data) => callback(data))
    .then((data) => callback(data))
}

function postJSON(url = "", data = {}, callback) {
    fetch(url, {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => console.log(response))
}


function patchJSON(url = "", data = {}, callback) {
    fetch(url, {
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => console.log(response))
}

///////////////////////////////////////////////////////////////////////////////
// INITIALIZATION
///////////////////////////////////////////////////////////////////////////////
function init() {
    document.getElementById("new-ramen").addEventListener("submit", formSubmit);

    getJSON("http://localhost:3000/ramens", renderAllRamens);
}

init();
///////////////////////////////////////////////////////////////////////////////
// TESTING CALLS
///////////////////////////////////////////////////////////////////////////////
