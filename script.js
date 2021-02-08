const searchFoods = () => {
    const search = document.getElementById('search-food').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayFoods(data.meals);
        })
        .catch(error => displayError('Invalid search'));
}


const displayFoods = foods => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = '';
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        const strInstructions = food.strInstructions.replace(/(\r\n|\r|\n)/g, '<br>');
        foodDiv.className = 'single-result col-md-3 foodPicture align-items-center my-3 p-3';
        foodDiv.innerHTML = `
        <div onclick="getFood('${food.strMeal}','${food.idMeal}', '${food.strMealThumb}', '${strInstructions}', '${food.strIngredient1}','${food.strIngredient2}', '${food.strIngredient3}','${food.strIngredient4}','${food.strIngredient5}')">
            
        <div class="cardInside">
        <div class="">
        <div class="d-flex justify-content-center">
        <img src=${food.strMealThumb} class="card-img-top" alt="...">
        </div>
        <div class="card-body text-center">
        <b class="card-text">${food.strMeal}</b>
</div>
</div>
    
        </div>
        <div class="col-md-3 text-md-right text-center">
        </div>
        
            </div>

        `;
        foodContainer.appendChild(foodDiv);
    })
}
const getFood = async (strMeal, idMeal, strMealThumb, strInstructions, strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayFood(idMeal, strMeal, strMealThumb, strInstructions, strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5);
    }
    catch (error) {
        displayError('Sorry! ERROR:404, Please try again later!!!')
    }
}


const displayFood = (food, strMeal, strMealThumb, strInstructions,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5) => {
   
    const foodDiv = document.getElementById('food-container');
    foodDiv.innerHTML = `<div  class=" mx-auto py-4">
    <div class="ingredients">
    <img src="${strMealThumb}" alt=""> <br>
        <h3 align=left>${strMeal}</h3>  
        <p>Ingredient</p>
        <ul id="item">
        <li>${strIngredient1}</li>
        <li>${strIngredient2}</li>
        <li>${strIngredient3}</li>
        <li>${strIngredient4}</li>
        <li>${strIngredient5}</li>
        </ul>     
        <p align=left>Instruction<br> ${strInstructions}</p>       
    </div> 
`;

}

const displayError = error => {
    const errorTag = document.getElementById('error');
    errorTag.innerText = error;
}

