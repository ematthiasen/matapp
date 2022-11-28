Moved cloud deployment from heroku to render.com, App now running on:
https://matapp.onrender.com/

App is now deployed through a docker container. 

Basic app concept:

Database:
FoodItems
Recipes
Equipment (not yet implemented)

Front page: list of recipes (collected from server)
Recipes are the baseline recipes template recipe with
- necessary ingredients
- Helper functions
  - Amount calculations based on cooking pot weight (not yet implemented)

Recipe page:
- UI lists all ingredients and amounts.
  - Possible to adjust the amounts on the fly with buttons (not using keyboard)
- UI lists instructions (not yet implemented)
- UI has helper functions to calculate amount of foodItem based on equipment used to store/measure. for example add total weight of bowl + ingredients, adjust amount of ingredient to total weight - bowl weight (not yet implemented)

