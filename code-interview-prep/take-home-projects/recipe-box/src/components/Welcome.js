import { useHistory } from "react-router-dom";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const history = useHistory();

  const handleGoToRecipeList = () => {
    history.push("/recipes");
  };
  const handleGoToAddNewRecipe = () => {
    history.push("/new-recipe");
  };

  return (
    <>
      <div className={classes.message}>
        <h1>Welcome to the Recipe Box!</h1>
        <p>Select an option to get started.</p>
      </div>
      <div className={classes.welcome}>
        <div onClick={handleGoToRecipeList}>
          <span>Recipe List</span>
        </div>
        <div onClick={handleGoToAddNewRecipe}>
          <span>Add New Recipe</span>
        </div>
      </div>
    </>
  );
};

export default Welcome;
