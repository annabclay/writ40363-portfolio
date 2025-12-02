// Step 1: Get the restaurant name
let restaurantName = "Pizza Place";
 
// Step 2: Convert to lowercase
let lowerName = restaurantName.toLowerCase();
 
// Step 3: Get search term (already lowercase)
let searchTerm = "pizza place";
 
// Step 4: Compare them
let matches = lowerName === searchTerm;
 
console.log(matches);
// Prints: true ✓