import { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./NewRecipeForm.module.css";

const NewRecipeForm = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("name");
    const description = formData.get("description");
    const ingredients = formData.get("ingredients");
    const steps = formData.get("steps");

    let error = false;
    for (const key of formData.keys()) {
      if (!formData.get(key).length > 0) {
        setHasError(true);
        error = true;
        break;
      }
    }

    if (!error) {
      const newRecipe = {
        name,
        description,
        ingredients: [ingredients],
        steps: [steps],
      };
      props.handleAddNewRecipe(newRecipe);
      setSubmitted(true);
      event.target.reset();
    }
  };

  const handleFocus = () => {
    setSubmitted(false);
    setHasError(false);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes["new-recipe"]}>
      <h1>Add New Recipe</h1>
      <form
        className={classes["form"]}
        onSubmit={handleSubmit}
        onFocus={handleFocus}
      >
        <label htmlFor="name">Recipe Name</label>
        <p>A name for the recipe</p>
        <input id="name" name="name" type="text" placeholder="Recipe name" />
        <label htmlFor="description">Description</label>
        <p>A description for the recipe</p>
        <textarea
          id="description"
          name="description"
          type="text"
          placeholder="A great recipe from Mars"
        />
        <label htmlFor="ingredients">Ingredients</label>
        <p>The ingredients for the recipe, one item per line</p>
        <textarea
          name="ingredients"
          id="ingredients"
          cols="30"
          rows="10"
          placeholder={"1/2 eggs\n1/3 something"}
        ></textarea>
        <label htmlFor="steps">Steps</label>
        <p>The steps for the recipe, one item per line</p>
        <textarea
          name="steps"
          id="steps"
          cols="30"
          rows="10"
          placeholder={"Do this\nThen do that"}
        ></textarea>
        {submitted ? (
          <div className={classes.success}>🛈 New Recipe Added Successfully</div>
        ) : (
          !hasError ? <button>Add New Recipe</button> : <div className={classes.error}>The inputs/text fields can't be empty.</div>
        )}
      </form>
      <div className={classes.back} onClick={handleBack}>
        Back
      </div>
    </div>
  );
};

export default NewRecipeForm;
