// Analyze calories using Open Food Facts API
async function analyze() {
  const ingredient = document.getElementById("ingredientInput").value;
  const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${ingredient}&json=1`);
  const data = await response.json();

  if (data.products && data.products.length > 0) {
    const product = data.products[0];
    document.getElementById("results").innerHTML = `
      <h2>${product.product_name}</h2>
      <p>Calories: ${product.nutriments.energy_value || "N/A"} kcal</p>
      <p>Protein: ${product.nutriments.proteins || "N/A"} g</p>
      <p>Fat: ${product.nutriments.fat || "N/A"} g</p>
    `;
  } else {
    document.getElementById("results").innerHTML = "No data found.";
  }
}

// Get meal ideas using Spoonacular API (requires free API key)
async function mealIdeas() {
  const ingredient = document.getElementById("ingredientInput").value;
  const apiKey = "YOUR_SPOONACULAR_API_KEY"; // replace with your free key
  const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=3&apiKey=${apiKey}`);
  const recipes = await response.json();

  let output = "<h2>Meal Ideas</h2>";
  recipes.forEach(r => {
    output += `<p>${r.title}</p>`;
  });

  document.getElementById("results").innerHTML = output;
}
