const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const mealsElement = document.getElementById("meals-id");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

fetchDataAsync(randomUrl);

async function fetchDataAsync(randomUrl) {
  try {
    const response = await fetch(randomUrl);
    const data = await response.json();
    const randomMeal = data.meals[0];
    //to run add random meal function here in future
    addMeal(randomMeal);
  } catch (error) {
    console.log(`${error}`);
  }
}

//add random meal and append to card function
function addMeal(mealData) {
  const meal = document.createElement("div");
  meal.classList.add("col-sm-4");

  meal.innerHTML = `

  <div class="card" style="width: 100%">
        <div class="meal-header">
            <span class="random">Recipe for the lost</span>
            <h5 class="card-title">${mealData.strMeal}</h5>
            <img class="card-img-1 img-fluid"
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="card-body">
            <a href = "javascript:void(0)" onclick= "fetchById(${mealData["idMeal"]})" data-id =${mealData["idMeal"]} class="btn btn-primary">Go to source</a>

        </div>
        </div>
        </div>
    `;
  mealsElement.appendChild(meal);
}

//search function here
async function getMealsBySearch(term) {
  try{
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
} catch (error) {
  console.log(`${error}`);
}
}

searchBtn.addEventListener("click", async () => {
  //for cleaning container, might wanna remove it during styling of site
  mealsElement.innerHTML = "";

  const search = searchTerm.value;
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});
