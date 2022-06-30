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
  meal.classList.add(`${mealData.strArea}`);
  meal.innerHTML = `
<div class="col-sm-3)
  <div class="card" style="width: 18rem">
        <div class="${mealData.strArea}">
            <h5 class="card-title">${mealData.strMeal}</h5>
            <img class="card-img-1 img-thumbnail"
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="card-body">
            <a href = "javascript:void(0)" onclick= "fetchById(${mealData["idMeal"]})" data-id =${mealData["idMeal"]} class="btn btn-primary">View Recipe</a>
        </div>
        </div>
        </div>
        <div>
    `;


  mealsElement.appendChild(meal);
 

}

//search function here
async function getMealsBySearch(term) {
  try {
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


//=========showmeal info================
const fetchById = (id) => {
  url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
      setToLocal(obj);
    })
    .catch((error) => {
      console.log(`${error}`);
    });
};

function setToLocal(obj) {
  const a = obj.meals;
  localStorage.setItem("mealsDesc", JSON.stringify(a[0]));
  window.location.href = "./recipe.html";
}