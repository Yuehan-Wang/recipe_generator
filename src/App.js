import React, { useState } from 'react';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [quantity, setQuantity] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [allergies, setAllergies] = useState('');
  const [meals, setMeals] = useState([]);
  const [preferences, setPreferences] = useState('');
  const [calories, setCalories] = useState('');
  const [recipe, setRecipe] = useState(''); 
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting form");
    console.log("Ingredients:", ingredients);
    console.log("Quantity:", quantity);
    console.log("Num people:", numPeople);
    try {
      const response = await fetch('/.netlify/functions/openai-proxy', {
        method: 'POST',
        body: JSON.stringify({
          prompt: `I have ${quantity} of ${ingredients} and I want to make ${numPeople} servings of ${meals.join(', ')} for people with preferences like ${preferences}. I want to make sure it is under ${calories} calories. I have allergies: ${allergies}.`
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log("Received data from API:", data); 
      if (data) {
        console.log("Setting recipe:", data); 
        setRecipe(data);
        console.log("Recipe set"); 
      } else {
        console.log("No valid data received");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            What ingredients do you have?
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            How much of each ingredient do you have?
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            How many people are you cooking for?
            <input
              type="int"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Do you have any allergies?
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Which meals are you planning for?
            <select multiple value={meals} onChange={(e) => setMeals([...e.target.selectedOptions].map(o => o.value))}>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
              <option value="snack">snack</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Anything you have in mind? (e.g. low-carb, high-protein, etc.):
            <input
              type="text"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            What's your daily calorie goal?
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </label>
        </div>
        <div>
       

          <button type="submit">Get your recipe!</button>
        </div>
      </form>
      <div className="recipe">
        <h2>Recipe Suggestion</h2>
        <p>
          {recipe ? recipe : loading ? "Waiting for recipe..." : "Submit your information to find out!"}
        </p>
      </div>

    </div>
  );
}

export default App;
