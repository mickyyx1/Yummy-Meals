let data = new URLSearchParams(window.location.search);
let res = data.get("area");
let row = document.querySelector(".row");
let categ = document.querySelector("#categ");
let area = document.querySelector("#area");
let swipe = document.querySelector("#right-swipe");
let loli = document.querySelector("#loli");
let navy = document.querySelector("#navy");
let nav2 = document.querySelector("#nav2");
let ing = document.querySelector("#ing");

swipe.addEventListener("click", () => {
  loli.classList.remove("loli");
  loli.classList.toggle("loli2");
  navy.classList.toggle("navy2");
  swipe.classList.toggle("swiper");
  nav2.classList.toggle("nav5");
});

categ.addEventListener("click", () => {
  window.location.href = "../Categories/categories.html";
});
area.addEventListener("click", () => {
  window.location.href = "../Area/area.html";
});
let contact = document.querySelector("#contact");
contact.addEventListener("click", () => {
  window.location.href = "../Contact/contact.html";
});
// let search = document.querySelector("#search");
// search.addEventListener("click", () => {
//   window.location.href = "../Search/search.html";
// });
ing.addEventListener("click", () => {
  window.location.href = "../Ingredient/ingredient.html";
});

async function fetchingMeal() {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${res}`
  );
  let res2 = await data.json();
  displayMeals(res2.meals);
}

function displayMeals(meals) {
  let cartoona = "";
  for (let i = 0; i < meals.length; i++) {
    cartoona += `   <div class="col-md-4 my-5">
                <div class="inner position-relative">
                    <div class=" img" data-id="${meals[i].idMeal}">
                        <img class=" w-100" src="${meals[i].strMealThumb}" alt="">
                        <div class="layer d-flex flex-column justify-content-center align-items-center"> <p class="text-center text-black fw-bolder">${meals[i].strMeal}</p></div>
                       
                    </div>
                </div>
            </div>`;
  }
  row.innerHTML = cartoona;

  let img2 = document.querySelectorAll(".img");
  img2.forEach((img2) => {
    img2.addEventListener("click", async () => {
      let mealId = img2.getAttribute("data-id");
      let data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      let res = await data.json();
      let myModal = new bootstrap.Modal(document.getElementById("mealModal"));
      let tag = document.querySelector("#tag");
      let ins = document.querySelector("#ins");
      let youtube = document.querySelector("#youtube");
      let source = document.querySelector("#source");
      let imgy2 = document.querySelector(".imgy2");
      let yt = res.meals[0].strYoutube;
      let sourcey = res.meals[0].strSource;
      let ins2 = res.meals[0].strInstructions;
      let tagy = res.meals[0].strCategory;
      let imgy = res.meals[0].strMealThumb;
      imgy2.src = `${imgy}`;

      tag.innerHTML = tagy;
      ins.innerHTML = ins2;
      source.href = sourcey;
      youtube.href = yt;

      myModal.show();
    });
  });
}

fetchingMeal();
