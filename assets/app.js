/*
There's probably a more efficient way to create these functions, please provide your input on how to optimize the code!
For now this was the best way for me to approach it with two steps
The two step approach atm is to grab the ingredient items images, and assigning each img their unique ID
Then once an img is clicked, generate the title and instruction text
*/

//this function grabs the recipe images with the searched ingredient item.
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
        //This empty method is here incase a user searches for another recipe using an ingredient
        $("#recipeSection").empty();
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
      });

}


//Runs displayRecipe function once a recipeImg class is clicked
$(document).on("click",".recipeImg", displayRecipe);