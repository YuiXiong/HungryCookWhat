const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

fetchDataAsync(randomUrl);

async function fetchDataAsync(url) {
  try {
    const response = await fetch(randomUrl)
    const data = await response.json()
    const randomMeal = data.meals[0]
    console.log("data: ", randomMeal)
    console.log("instructions", data.meals[0].strInstructions)

    const instructions = data.meals[0].strInstructions
  
    console.log(instructions)
    addTextToDom(instructions, "p", ".card-text-1");


  } catch (error) {
    console.log(`${error}`)
  }

}

//create cards function

const addTextToDom = (text, childSelector, parentSelector) => {
  const childElement = document.createElement(childSelector)
  const parentElement = document.querySelector(parentSelector)
  childElement.innerText = text
  parentElement.appendChild(childElement)
};

