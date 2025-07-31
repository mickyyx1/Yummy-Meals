let row = document.querySelector(".row");
let image2 = document.querySelectorAll(".pic");
let swipe = document.querySelector("#right-swipe");
let loli = document.querySelector("#loli");
let navy = document.querySelector("#navy");
let nav2 = document.querySelector("#nav2");
let area = document.querySelector("#area");

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
let ing = document.querySelector("#ing");
ing.addEventListener("click", () => {
  window.location.href = "../Ingredient/ingredient.html";
});
area.addEventListener("click", () => {
  window.location.href = "../Area/area.html";
});
async function catFtech() {
  let fetching = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await fetching.json();
  console.log(data);
  displayCat(data.categories);
  return data;
}
catFtech();

function displayCat(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `     
      <div class="col-md-3 my-3">
        <div class="inner-content">
          <div class="pic"> 
            <img data-category="${
              arr[i].strCategory
            }" class="meal-img w-100 h-100 " src="${
      arr[i].strCategoryThumb
    }" alt="" />
            <div class="layer d-flex justify-content-center align-items-center flex-column fs-4">
              <p class="fw-bolder text-center my-3">${arr[i].strCategory}</p>
              <p class="text-center"> ${arr[i].strCategoryDescription.slice(
                0,
                80
              )}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  row.innerHTML = cartoona;

  let image2 = document.querySelectorAll(".pic");
  image2.forEach((img) => {
    img.addEventListener("click", async () => {
      let cat = img.querySelector("img").dataset.category;

      localStorage.setItem("category", cat);

      window.location.href = "../CategoryMeals/catmeals.html";
    });
  });
}
