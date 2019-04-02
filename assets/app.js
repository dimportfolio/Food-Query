/*
There's probably a more efficient way to create these functions, please provide your input on how to optimize the code!
For now this was the best way for me to approach it with two steps
The two step approach atm is to grab the ingredient items images, and assigning each img their unique ID
Then once an img is clicked, generate the title and instruction text
*/

//this function grabs the recipe images with the searched ingredient item.
// $.ajax({
//   type: 'GET',
//   url: 'https://api.nutritionix.com/v1_1/item/taco?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=2621c4e5&appKey=fb83196912d59b7171ffb6f320d7a0fa',
// }).then(function(test){
//   console.log(test);
// })

//curl -v  -X GET "https://api.nutritionix.com/v1_1/item?id=c640834927576f2c7fe01c19&appId=2621c4e5&appKey=fb83196912d59b7171ffb6f320d7a0fa"

$("#submit").on("click", function(){
  var searchVal = $("#search").val();
  var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?offset=0&query=" + searchVal;

    $.ajax({
      type: 'GET',
      url: queryUrl,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        
        "X-RapidAPI-Key" : "36b1955be7msh1566b339f906515p10b495jsn27ecc72ce407"
      }
      }).then(function(res) {
        console.log(res);
        //This is a loop that is generating the recipe images
        for (i=0; i<res.results.length; i++){
          var img = $("<img>");
          img.addClass("recipeImg img-thumbnail img-fluid float-left");
          img.attr("id", res.results[i].id);
          img.attr("src", res.baseUri + res.results[i].image);
          $("#recipeSection").append(img);
        }
      });
//This function grabs the recipe information by the recipe ID
})
function displayRecipe(){
  var imgId = $(this).attr("id");
  var queryRecipeUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + imgId +  "/information";
  
    $.ajax({
      type: 'GET',
      url: queryRecipeUrl,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: false
      },
      headers: {
        "X-RapidAPI-Key" : "36b1955be7msh1566b339f906515p10b495jsn27ecc72ce407"
      }
      }).then(function(res) {
        console.log(res);
        //Once the img is selected, this clears the recipeSection, then appends the title and instructions to it
        $("#recipeSection").empty();
        //create header tag, and adding title text to it
        var h = $("<h1>");
        h.text(res.title);
        //create paragraph tag, and adding instructions text to it
        var p = $("<p>");
        p.text(res.instructions);
        $("#recipeSection").append(h);
        $("#recipeSection").append(p);
        //this section creates an array, and has a loop that pushes each ingredient into that array
        var ingredientArray = [];
        for (i=0;i<res.extendedIngredients.length; i++){
        ingredientArray.push(res.extendedIngredients[i].name);
        console.log(ingredientArray); 
        var div = $("<div>");
        div.attr("id", res.extendedIngredients[i].name);
        div.addClass("labels");
        div.text(res.extendedIngredients[i].name);
        $("#nutrition").append(div);
        };

        //this section creates an array with ingredient objects...
        // var recipe = [];
      });   

}

function displayLabel(){
  var labelId = $(this).attr("id");
  var queryNutritionUrl = `https://trackapi.nutritionix.com/v2/search/instant?query=${
            labelId
          }`;
          $.ajax({
            type: 'GET',
            url: queryNutritionUrl,
            // contentType: 'application/json',
            xhrFields: {
              withCredentials: false
            },
            headers: {
              "x-app-id": "2621c4e5",
              "x-app-key": "fb83196912d59b7171ffb6f320d7a0fa"
              // "X-RapidAPI-Key" : "ff276a5d86mshf315d9fdfb9fac2p191618jsnaba7bfcf9b2d"
              // "X-RapidAPI-Key" : "36b1955be7msh1566b339f906515p10b495jsn27ecc72ce407"
            }
            }).then(function(response) {
              console.log(response);
              $("#label").nutritionLabel({itemName : response.common[0].food_name}); 
            });
            
}
//Runs displayRecipe function once a recipeImg class is clicked
$(document).on("click",".recipeImg", displayRecipe);
$(document).on("click",".labels", displayLabel);


/*
var queryNutritionUrl = `https://trackapi.nutritionix.com/v2/search/instant?query=${
            ingredientArray[i]
          }`;
          $.ajax({
            type: 'GET',
            url: queryNutritionUrl,
            // contentType: 'application/json',
            xhrFields: {
              withCredentials: false
            },
            headers: {
              "x-app-id": "2621c4e5",
              "x-app-key": "fb83196912d59b7171ffb6f320d7a0fa"
              // "X-RapidAPI-Key" : "ff276a5d86mshf315d9fdfb9fac2p191618jsnaba7bfcf9b2d"
              // "X-RapidAPI-Key" : "36b1955be7msh1566b339f906515p10b495jsn27ecc72ce407"
            }
            }).then(function(response) {
              console.log(response);
              // var name = response.branded[0].food_name;
              // var calories = JSON.stringify(response.branded[0].nf_calories);
            });
            */

            // $("#test"+i).nutritionLabel({itemName : recipe[i].name,
            // valueCalories : recipe[i].cal}); 