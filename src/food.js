const fetchMealData = async (mealType) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealType}`);
    const data = await response.json();
    return data.meals;
};

const displayMealData = (meals) => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <center><img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 400px; height: auto;"></center>
                <h3>Meal Instruction:</h3>
                    ${meal.strInstructions}
                <h3>Ingredients:</h3>
                <ul>
                    ${getIngredientsList(meal)}
                </ul>
                <h3>Youtube Link:</h3>
                <a href="${meal.strYoutube}" target="_blank">Watch here</a>
                <h3> source recipe </h3>
                <h3><a href="${meal.strSource}">click here</h3>
            `;
            mealContainer.appendChild(mealDiv);
        });
    } else {
        mealContainer.innerHTML = 'No meals found.';
    }
};
const getIngredientsList = (meal) => {
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList.push(`<li>${measure} ${ingredient}</li>`);
        }
    }
    return ingredientsList.join('');
};

document.addEventListener('DOMContentLoaded', () => {
    const fetchMealBtn = document.getElementById('fetch-meal-btn');
    const mealTypeDropdown = document.getElementById('meal-type-dropdown');

    fetchMealBtn.addEventListener('click', async () => {
        const mealType = mealTypeDropdown.value;
        const meals = await fetchMealData(mealType);

        displayMealData(meals);
    });
});