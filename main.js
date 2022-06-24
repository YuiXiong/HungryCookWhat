const randomUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const mealsElement = document.getElementById("meals-id");

fetchDataAsync(randomUrl);

async function fetchDataAsync(randomUrl) {
  try {
    const response = await fetch(randomUrl)
    const data = await response.json()
    const randomMeal = data.meals[0]
    addMeal(randomMeal)
    addMeal(randomMeal)
    //to run add random meal function here in future

    //omit here in future
    console.log("data: ", randomMeal)
    console.log("instructions", data.meals[0].strInstructions)
    const instructions = data.meals[0].strInstructions
    console.log(instructions)
    addTextToDom(instructions, "p", ".card-text-1");


  } catch (error) {
    console.log(`${error}`)
  }

}

//addTextToDom probably remove in future since it will be build into fn
const addTextToDom = (text, childSelector, parentSelector) => {
  const childElement = document.createElement(childSelector)
  const parentElement = document.querySelector(parentSelector)
  childElement.innerText = text
  parentElement.appendChild(childElement)
};

//add random meal and append to card function
function addMeal(mealData) {
  console.log(mealData);

  const meal = document.createElement("div");
  meal.classList.add("col-sm-3");

  meal.innerHTML = `

  <div class="card" style="width: 18rem;">
        <div class="meal-header">
            ${`
            <span class="random"> Random Recipe 1</span>`
            }
            <img class="card-img-1 img-fluid"
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="card-body">
            <h5 class="card-title">${mealData.strMeal}</h5>
            <a href="${mealData.strSource}" class="btn btn-primary">Go to source</a>

        </div>
        </div>
        </div>
    `;


  mealsElement.appendChild(meal);
}