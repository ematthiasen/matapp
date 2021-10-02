

How the app should work:

Database:
FoodItems
Recipes
CookingLog
Equipment

Front page: list of recipes (collected from server)
Recipes are the baseline recipes template recipe with
- necessary ingredients
- Helper functions
  - Amount calculations based on cooking pot weight

CookingLog - List of dates when recipe has been cooked with notes 

Button to create cooking instance from recipe or cooking log
- New item created in CookingLog.
Cooking page:
- UI lists all ingredients and amounts.
  - Possible to adjust the amounts on the fly with buttons (not using keyboard)
- UI lists instructions
- UI has helper functions to calculate amount of foodItem based on equipment used to store/measure. for example add total weight of bowl + ingredients, adjust amount of ingredient to total weight - bowl weight

