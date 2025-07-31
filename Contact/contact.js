let categ = document.querySelector("#categ");
let area = document.querySelector("#area");
let swipe = document.querySelector("#right-swipe");
let loli = document.querySelector("#loli");
let navy = document.querySelector("#navy");
let nav2 = document.querySelector("#nav2");
let mealName = document.querySelector("#mealName");
let row = document.querySelector("#row2");

let inputs = document.querySelectorAll("input:not([type='submit'])");
let submitBtn = document.querySelector("#submitButton");

let patterns = {
  name: /^[a-zA-Z ]{3,}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /^[0-9]{10,15}$/,
  age: /^(1[0-1][0-9]|[1-9][0-9]?|120)$/,
  password: /^.{6,}$/,
};

function validateInput(input, pattern) {
  return pattern.test(input.value.trim());
}

function checkFormValidity() {
  const [name, email, phone, age, password, repassword] = inputs;

  let isValid =
    validateInput(name, patterns.name) &&
    validateInput(email, patterns.email) &&
    validateInput(phone, patterns.phone) &&
    validateInput(age, patterns.age) &&
    validateInput(password, patterns.password) &&
    password.value === repassword.value;

  submitBtn.disabled = !isValid;
}

inputs.forEach((input) => {
  input.addEventListener("input", checkFormValidity);
});

checkFormValidity();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!submitBtn.disabled) {
    inputs.forEach((input) => (input.value = ""));
    submitBtn.disabled = true;
    alert("Done!!");
  }
});

swipe.addEventListener("click", () => {
  loli.classList.remove("loli");
  loli.classList.toggle("loli2");
  navy.classList.toggle("navy2");
  swipe.classList.toggle("swiper");
  nav2.classList.toggle("nav5");
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
categ.addEventListener("click", () => {
  window.location.href = "../Categories/categories.html";
});
