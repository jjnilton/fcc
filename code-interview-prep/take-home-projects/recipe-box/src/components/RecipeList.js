import { Link } from "react-router-dom";
import classes from "./RecipeList.module.css";

const RecipeList = (props) => {
  const recipeData = props.recipeData;

  const recipeList = recipeData.map((recipe) => {
    return (
      <li key={recipe.id}>
        <div className={classes.info}>
          <div className={classes.name}>{recipe.name}</div>
          <div className={classes.description}>{recipe.description}</div>
        </div>
        <Link to={`/recipe/${recipe.id}`}>View / Edit</Link>
      </li>
    );
  });

  return (
    <div className={classes["recipe-list"]}>
      <h1>Recipe Index</h1>
      {console.log(recipeData)}
      <div>
        {recipeData.length > 0 ? <ul>{recipeList}</ul> : <p className={classes.empty}>No recipes found.</p> }
      </div>
    </div>
  );
};

export default RecipeList;
