const contentContainer = document.getElementsByClassName("content-container");
const imageContainer = document.getElementsByClassName("image-container"); 
const ingredientContainer = document.getElementById("ingredient-container"); 
const ingredientList = document.createElement("ol");

//getting stuff off local storage
const mealdesc = localStorage.getItem("mealsDesc"); 
const mealDescription = JSON.parse(mealdesc);

// add Instructions of meal to DOM
const instructions = document.createElement("div");
instructions.id = "instruction-wrapper";
instructions.innerHTML = `
<h1>${mealDescription["strMeal"]}</h1>
<div id = "instructions">${mealDescription["strInstructions"]}</div>
<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${mealDescription.strYoutube.slice(-11)}">
				</iframe>
			</div>`;
contentContainer[0].append(instructions);

//add image of recipe to DOM
imageContainer[0].innerHTML = `<img src = "${mealDescription["strMealThumb"]}"  class="img-fluid"/> 
`;

// concate and adding ingredients + measure to DOM
let strIngredient = [];
for (i = 1; i <= 20; i++) {
  strIngredient.push("strIngredient" + i);
}
let strMeasure = [];
for (i = 1; i <= 20; i++) {
  strMeasure.push("strMeasure" + i);
}
i = 0;
while (i <= 20) {
  a = strIngredient[i];
  b = strMeasure[i];

  if (mealDescription[a] == "" || mealDescription[a] == null) {
    i++;
    continue;
  }

  const ingredientListItem = document.createElement("li");
  ingredientListItem.innerHTML = `${mealDescription[a]} = ${mealDescription[b]}`;

  ingredientList.append(ingredientListItem);
  i++;
}

ingredientContainer.append(ingredientList);
