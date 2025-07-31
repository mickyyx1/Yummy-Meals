let row = document.querySelector("#row");
let modal = document.querySelector(".modal");
let modalinstur = document.querySelector("#modalInstructions");
let ref = document.querySelector("#ref");
let ref2 = document.querySelector("#ref2");
let mealImgElement = document.querySelector("#modalImg");
let modalTitle = document.querySelector(".modal-title");
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
  window.location.href = "./Contact/contact.html";
});

// let search = document.querySelector("#search");
// search.addEventListener("click", () => {
//   window.location.href = "./Search/search.html";
// });

area.addEventListener("click", () => {
  window.location.href = "./Area/area.html";
});

categ.addEventListener("click", () => {
  window.location.href = "./Categories/categories.html";
});

let ing = document.querySelector("#ing");
ing.addEventListener("click", () => {
  window.location.href = "../Ingredient/ingredient.html";
});

// Fetch meals
async function fetchingMeals() {
  try {
    const fetching = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const response = await fetching.json();
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    return { meals: [] };
  }
}

// Load and display meals
async function mealsData() {
  const data = await fetchingMeals();
  displayProduct(data.meals);
}

// Display meals
function displayProduct(arr) {
  if (!arr || arr.length === 0) {
    row.innerHTML = "<p class='text-danger'>No meals found.</p>";
    return;
  }

  let cartoona = "";

  for (let meal of arr) {
    if (!meal.strMealThumb) continue; // تجاهل الوجبات اللي مفيهاش صورة

    cartoona += `
      <div class="col-sm-10 col-md-3 my-3">
        <div class="inner-content">
          <div class="pic">
            <img data-id="${meal.idMeal}" 
                 class="meal-img w-100 h-100 rounded rounded-circle" 
                 src="${meal.strMealThumb}" 
                 alt="${meal.strMeal}" />
            <div class="fw-bolder rounded rounded-circle layer text-center d-flex justify-content-center align-items-center fs-4">
              ${meal.strMeal}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  row.innerHTML = cartoona;

  // Add modal functionality
  let mealImgs = document.querySelectorAll(".meal-img");
  mealImgs.forEach((img) => {
    img.addEventListener("click", async () => {
      const id = img.dataset.id;
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        const meal = data.meals[0];

        modalinstur.innerHTML = `Instructions: ${meal.strInstructions}`;
        modalTitle.innerHTML = meal.strMeal;
        ref.href = meal.strYoutube || "#";
        ref2.href = meal.strSource || "#";
        mealImgElement.src = meal.strMealThumb;

        let myModal = new bootstrap.Modal(document.getElementById("mealModal"));
        myModal.show();
      } catch (err) {
        console.error("Modal error:", err);
      }
    });
  });
}

mealsData();
