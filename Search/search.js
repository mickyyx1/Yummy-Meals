let nameSearch = document.querySelector("#nameSearch");
let letterSearch = document.querySelector("#letterSearch");
let categ = document.querySelector("#categ");
let area = document.querySelector("#area");
let swipe = document.querySelector("#right-swipe");
let loli = document.querySelector("#loli");
let navy = document.querySelector("#navy");
let nav2 = document.querySelector("#nav2");
let mealName = document.querySelector("#mealName");
let row = document.querySelector("#row2");

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
let ing = document.querySelector("#ing");

ing.addEventListener("click", () => {
  window.location.href = "../Ingredient/ingredient.html";
});
area.addEventListener("click", () => {
  window.location.href = "../Area/area.html";
});
categ.addEventListener("click", () => {
  window.location.href = "../Categories/categories.html";
});

nameSearch.addEventListener("keydown", async (e) => {
  if (e.key == "Enter" && nameSearch.value.trim() != "") {
    const res = await fetchingMeals(nameSearch.value);
    displayMeals(res.meals);
    nameSearch.value = "";
    nameSearch.blur();
  }
});

letterSearch.addEventListener("input", async () => {
  if (letterSearch.value.trim() != "") {
    const res = await fetchingMealsLetter(letterSearch.value);
    displayMeals(res.meals);
  }
});

async function fetchingMealsLetter(letter) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let res = await data.json();
  return res;
}
async function fetchingMeals(meal) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  let res = await data.json();
  return res;
}

function displayMeals(meals) {
  let cartoona = "";
  for (let i = 0; i < meals.length; i++) {
    cartoona += `  <div class="col-md-4 ing" data-id="${meals[i].idMeal}"> 
          <div class="inner-content py-3">
            <div class="image position-relative">
              <img class="w-100" src="${meals[i].strMealThumb}" alt="" />
              <div
                class="layer d-flex justify-content-center align-items-center"
              >
                <p id="mealName" class="fw-bolder">${meals[i].strMeal}</p>
              </div>
            </div>
          </div>
        </div>`;
  }
  row.innerHTML = cartoona;
  let inge = document.querySelectorAll(".ing");
  inge.forEach((inge) => {
    inge.addEventListener("click", async (event) => {
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
fetchingMeals("Big Mac");
fetchingMealsLetter();
