let swipe = document.querySelector("#right-swipe");
let loli = document.querySelector("#loli");
let navy = document.querySelector("#navy");
let nav2 = document.querySelector("#nav2");
let categ = document.querySelector("#categ");

swipe.addEventListener("click", () => {
  loli.classList.remove("loli");
  loli.classList.toggle("loli2");
  navy.classList.toggle("navy2");
  swipe.classList.toggle("swiper");
  nav2.classList.toggle("nav5");
});

let ing = document.querySelector("#ing");

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

categ.addEventListener("click", () => {
  window.location.href = "../Categories/categories.html";
});

let row = document.querySelector("#row");
async function fetchingArea() {
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let res = await data.json();

  displayAreas(res.meals);
}

function displayAreas(meals) {
  let cartoona = "";
  for (let i = 0; i < meals.length; i++) {
    cartoona += `  <div class="col-md-4">
          <div class="area inner text-center" data-area="${meals[i].strArea}">
            <i  style="font-size:100px" class=" fa-solid fa-igloo text-white"></i>
              <p class="text-white ">${meals[i].strArea}</p>
          
          </div>
        </div>`;
  }
  row.innerHTML = cartoona;
  let area = document.querySelectorAll(".area");
  area.forEach((area) => {
    area.addEventListener("click", async () => {
      let areaName = area.getAttribute("data-area");
      let data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
      );
      let res = await data.json();
      window.location.href = `../AreaMeals/areameals.html?area=${areaName}`;
    });
  });
}
fetchingArea();
