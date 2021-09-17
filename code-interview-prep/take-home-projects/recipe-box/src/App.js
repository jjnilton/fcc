import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import RecipeIndex from "./pages/RecipeIndex";
import NewRecipe from "./pages/NewRecipe";
import Header from "./components/Header";
import RecipeDetail from "./pages/RecipeDetail";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useRef, useState } from "react";

const DUMMY_RECIPES = [
  {
    id: 0,
    name: "Coxinha",
    description: "Brazilian Coxinha Recipe – Fried Chicken Dumplings",
    ingredients: [
      "1 quart vegetable oil (for frying)",
      "3 1/2 Cups chicken broth",
      "1 Onion",
      "1 Carrot",
      "1 stick of celery",
      "1 Large chicken breast",
      "8 oz package of cream cheese",
      "1 Garlic clove",
      "Salt and pepper",
      "1/2 Tablespoon extra virgin olive oil",
      "2 Cups All -purpose flour",
      "1 Egg",
      "1 Tablespoon whole milk",
      "1 Cup regular flavored bread crumbs",
    ],
    steps: [
      "In a large pot or fryer, preheat oil to 350 degrees",
      "Quarter the onion and celery and peeled carrot and combine with the broth into a large pot. Bring to a simmering boil. Carefully add the chicken, cover and reduce the heat to medium. Cook for about 12 minutes, or until just cooked through. Turn off the heat and leave the liquid, but remove the chicken. Let chicken cool for about 10 minutes.",
      "With two forks, shred the chicken. Combine in mixing bowl with cream cheese. Salt and pepper to taste.",
      "Strain 1 1/2 Cups of the liquid you in which you poached the chicken. Combine with oil in new saucepan and bring to a boil. Turn off heat and immediately stir in flour until dough forms. Put on lightly floured surface and knead for about 5 minutes until smooth.",
      "Roll out dough to about 1″ thick and use a cookie cutter or cup to cut out rounds about 4″-5″ in diameter. Place a small amount (about 1 1/2 Tablespoon) of the shredded chicken mixture in the center of the round. Seal the dough together by pinching it, forming a teardrop shape.",
      "In a small bowl, lightly whisk eggs and milk together and place bread crumbs in another bowl. Carefully dip the dough in the egg mixture and then the bread crumbs, coating the entire dumpling. Fry in oil for about 7-9 minutes or until a golden brown. Dry on paper towels and lightly salt while still hot." 
    ],
  },
];

function App() {
  const [recipes, setRecipes] = useState([]);
  const didMount = useRef(false);

  const handleAddNewRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => {
      const lastId =
        prevRecipes.length > 0 ? prevRecipes[prevRecipes.length - 1].id : 0;
      const updatedRecipes = [...prevRecipes, { id: lastId + 1, ...newRecipe }];
      console.log(updatedRecipes);
      return updatedRecipes;
    });
  };

  const handleEditRecipe = (editedRecipe) => {
    console.log("handling");

    setRecipes((prevRecipes) => {
      const recipeIndex = prevRecipes.findIndex(
        (recipe) => recipe.id === editedRecipe.id
      );
      const updatedRecipes = [...prevRecipes];
      updatedRecipes[recipeIndex] = editedRecipe;

      return updatedRecipes;
    });
  };

  const handleDeleteRecipe = (recipeId) => {
    setRecipes((prevRecipes) => {
      const filteredRecipes = [...prevRecipes].filter(
        (recipe) => recipe.id !== recipeId
      );
      return filteredRecipes;
    });
  };

  useEffect(() => {
    if (didMount.current) {
      console.log("when updated recipes");
      localStorage.setItem("recipes", JSON.stringify(recipes));
    } else {
      if (localStorage.getItem("recipes")) {
        setRecipes(JSON.parse(localStorage.getItem("recipes")));
      } else {
        setRecipes(DUMMY_RECIPES);
      }
      didMount.current = true;
    }
  }, [recipes]);

  return (
    <>
      <div class="App">
        <Header></Header>
        <main>
          <Switch>
            <Route path="/recipe/:recipeId">
              <RecipeDetail
                recipeData={recipes}
                handleEditRecipe={handleEditRecipe}
                handleDeleteRecipe={handleDeleteRecipe}
              ></RecipeDetail>
            </Route>
            <Route path="/new-recipe">
              <NewRecipe handleAddNewRecipe={handleAddNewRecipe}></NewRecipe>
            </Route>
            <Route path="/recipes">
              <RecipeIndex recipeData={recipes}></RecipeIndex>
            </Route>
            <Route path="/" exact>
              <Home></Home>
            </Route>
            <Route path="*">
              <PageNotFound></PageNotFound>
            </Route>
          </Switch>
        </main>
        <footer>
          <a href="">Source</a>
        </footer>
      </div>
    </>
  );
}

export default App;
