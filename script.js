document.getElementById("getFoodBtn").addEventListener("click", getFood);

const url = 'https://chinese-food-db.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b321c6d12fmsh7191d1e3729700cp143cecjsn2807ece00022',
		'x-rapidapi-host': 'chinese-food-db.p.rapidapi.com'
	}
};

async function getFood() { 
    try {
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let chineseFood = await response.json();
        const foodDiv = document.getElementById('foodContainer');
        foodDiv.innerHTML = '';

        const easyChecked = document.getElementById('easy').checked;
        const mediumChecked = document.getElementById('medium').checked;

        if (easyChecked && !mediumChecked) {
            chineseFood = chineseFood.filter(food => food.difficulty === 'Easy');
        } else if (!easyChecked && mediumChecked) {
            chineseFood = chineseFood.filter(food => food.difficulty === 'Medium');
        }
        
        chineseFood.slice(0, 20).forEach(food => {
            const newFoodElement = document.createElement('div');
            newFoodElement.classList.add('food');

            newFoodElement.innerHTML = `
                <img src="${food.image}" alt="..." width="250px" height="250px"/>
                <h2>${food.title}</h2>
                <h3>Cooking difficulty : ${food.difficulty}</h3>
                <details data-id="${food.id}" class="detailsTag" id="details${food.id}" 
                    onclick="getFoodDetail(${food.id})">
                    <summary>Click for more details</summary>
                </details>
            `;
            foodDiv.appendChild(newFoodElement);
        });
        
    } catch(error) {
        console.log(`Error => ${error}`);
    }
}

async function getFoodDetail(foodId) {
    const foodDetailUrl = `${url}${foodId}`;
    try {
        const response = await fetch(foodDetailUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const foodDetail = await response.json();
        const detailsTag = document.getElementById(`details${foodId}`);

        detailsTag.innerHTML = `
            <summary>Click for more details</summary>
        `;

        const detailsP1 = document.createElement('p');
        detailsP1.innerHTML = `Time : ${foodDetail.time}`;

        const detailsP2 = document.createElement('p');
        detailsP2.innerHTML = `Description : ${foodDetail.description}`;

        const detailsP3 = document.createElement('p');
        detailsP3.innerHTML = `Portion : ${foodDetail.portion}`;

        detailsTag.appendChild(detailsP1);
        detailsTag.appendChild(detailsP2);
        detailsTag.appendChild(detailsP3);

    } catch (error) {
        console.log(`Error => ${error}`);
    }
}