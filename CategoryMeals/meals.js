let row = document.querySelector(".row");
let categ = document.querySelector("#categ");
let area = document.querySelector("#area");
let swipe = document.querySelector("#right-swipe");
let loli = document.querySelector("#loli");
let navy = document.querySelector("#navy");
let nav2 = document.querySelector("#nav2");

swipe.addEventListener("click", () => {
  loli.classList.remove("loli");
  loli.classList.toggle("loli2");
  navy.classList.toggle("navy2");
  swipe.classList.toggle("swiper");
  nav2.classList.toggle("nav5");
});
let contact = document.querySelector("#contact");
contact.addEventListener("click", () => {
  window.location.href = "../Contact/contact.html";
});
categ.addEventListener("click", () => {
  window.location.href = "../Categories/categories.html";
});
// let search = document.querySelector("#search");
// search.addEventListener("click", () => {
//   window.location.href = "../Search/search.html";
// });
let ing = document.querySelector("#ing");
ing.addEventListener("click", () => {
  window.location.href = "../Ingredient/ingredient.html";
});
area.addEventListener("click", () => {
  window.location.href = "../Area/area.html";
});
async function fetchingMeals(params) {
  let category = localStorage.getItem("category");
  if (!category) {
    console.log("مش موجوده");
  }
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let res = await data.json();
  displayMeals(res.meals);
}

function displayMeals(meals) {
  let cartoona = "";

  for (let i = 0; i < meals.length; i++) {
    cartoona += `<div class="imgy col-md-4 my-3 py-3" data-id="${meals[i].idMeal}">
          <div class="inner-content">
            <div class="pic">
              <img
                class="w-100 rounded rounded-circle"
                src="${meals[i].strMealThumb}"
                alt=""
              />
              <div class="layer rounded rounded-circle text-black fw-bolder">
                ${meals[i].strMeal}
              </div>
            </div>
          </div>
        </div>`;
  }

  row.innerHTML = cartoona;

  let imgyElements = document.querySelectorAll(".imgy");

  imgyElements.forEach((element) => {
    element.addEventListener("click", async (event) => {
      let mealId = event.currentTarget.getAttribute("data-id");
      let data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      let res = await data.json();
      console.log(res);
      let myModal = new bootstrap.Modal(document.getElementById("mealModal"));
      let title = document.querySelector(".modal-title");
      let ins = document.querySelector(".modal-ins");
      let imgy = document.querySelector(".m-img");
      let ref = document.querySelector("#ref");
      let ref2 = document.querySelector("#ref2");
      let mTitle = res.meals[0].strCategory;
      let mIns = res.meals[0].strInstructions;
      let mImg = res.meals[0].strMealThumb;
      let reff = res.meals[0].strYoutube;
      let reff2 = res.meals[0].strSource;
      ins.innerHTML = mIns;
      title.innerHTML = mTitle;
      imgy.src = mImg;
      ref.href = `${reff}`;
      ref2.href = `${reff2}`;

      myModal.show();
    });
  });
}

fetchingMeals();
