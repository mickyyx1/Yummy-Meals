let categ = document.querySelector("#categ");
let area = document.querySelector("#area");
let swipe = document.querySelector("#right-swipe");
let loli = document.querySelector("#loli");
let navy = document.querySelector("#navy");
let nav2 = document.querySelector("#nav2");
let row = document.querySelector(".row");

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

// let search = document.querySelector("#search");
// search.addEventListener("click", () => {
//   window.location.href = "../Search/search.html";
// });
categ.addEventListener("click", () => {
  window.location.href = "../Categories/categories.html";
});
area.addEventListener("click", () => {
  window.location.href = "../Area/area.html";
});
async function fetchingIng(params) {
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let res = await data.json();
  let final = res.meals.slice(0, 20);

  displayIng(final);
}

function displayIng(meals) {
  let cartoona = "";
  for (let i = 0; i < meals.length; i++) {
    cartoona += `
      <div class="col-md-4 ing" data-id="${meals[i].strIngredient}">
        <div
         
          class="inner-content d-flex justify-content-center align-items-center flex-column"
        >
          <i
           
            style="font-size: 100px"
            class="text-white fa-solid fa-bowl-food fa-spin-pulse m m-auto"
          ></i>
          <p class="text-white text-center">
            ${(meals[i].strDescription || meals[i].strIngredient || "")
              .split(" ")
              .slice(0, 20)
              .join(" ")}
          </p>
        </div>
      </div>
    `;
  }
  row.innerHTML = cartoona;

  let inge = document.querySelectorAll(".ing");
  inge.forEach((inge) => {
    inge.addEventListener("click", async (event) => {
      let mealName = event.currentTarget.getAttribute("data-id");
      let data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`
      );
      let res = await data.json();

      window.location.href = `../IngredientMeals/ingmeals.html?area=${mealName}`;
    });
  });
}

fetchingIng();
