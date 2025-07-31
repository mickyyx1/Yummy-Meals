let country = new URLSearchParams(window.location.search);
let areaName = country.get("area");
let row = document.querySelector(".row");
let where = document.querySelector("#where");
let imgg = document.querySelector("#imgg");
let ins = document.querySelector("#ins");
let source = document.querySelector("#sour");
let youtube = document.querySelector("#you");
let mealName = document.querySelector("#mealName");
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
let contact = document.querySelector("#contact");
contact.addEventListener("click", () => {
  window.location.href = "../Contact/contact.html";
});
ing.addEventListener("click", () => {
  window.location.href = "../Ingredient/ingredient.html";
});
// let search = document.querySelector("#search");
// search.addEventListener("click", () => {
//   window.location.href = "../Search/search.html";
// });

area.addEventListener("click", () => {
  window.location.href = "../Area/area.html";
});
categ.addEventListener("click", () => {
  window.location.href = "../Categories/categories.html";
});
async function fetchCountry(params) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let res = await data.json();

  displayAreas(res.meals);
}

function displayAreas(meals) {
  let cartoona = "";
  for (let i = 0; i < meals.length; i++) {
    cartoona += `    <div class="col-md-4 my-5">
          <div class="inner-content">
           <div class="area img position-relative" data-id="${meals[i].idMeal}" >
              <img class="w-100" src="${meals[i].strMealThumb}" alt="" />
              <div class="layer d-flex justify-content-center align-items-center">
              <p class="text-center fw-bolder">${meals[i].strMeal}</p>
              </div>
            </div>
          </div>
        </div>`;
  }
  row.innerHTML = cartoona;
  let area = document.querySelectorAll(".area");
  area.forEach((area) => {
    area.addEventListener("click", async () => {
      let mealId = area.getAttribute("data-id");
      let data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      let res = await data.json();

      let myModal = new bootstrap.Modal(document.getElementById("mealModal"));
      let whereIs = res.meals[0].strArea;
      let theImg = res.meals[0].strMealThumb;
      let inss = res.meals[0].strInstructions;
      let sor = res.meals[0].strSource;
      let yo = res.meals[0].strYoutube;
      let name = res.meals[0].strTags;
      console.log(sor);

      if (name === "" || name === null) {
        mealName.innerHTML = "No Tags Founded For This Meal";
      } else {
        mealName.innerHTML = name;
      }

      where.innerHTML = `Dish Region Is : ${whereIs}`;
      imgg.src = theImg;
      ins.innerHTML = `${inss}`;
      source.href = sor;
      youtube.href = yo;

      myModal.show();
    });
  });
}

fetchCountry();
