import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import NotFound from "../components/NotFound";
import classes from "./RecipeView.module.css";

const RecipeView = (props) => {
  const { recipeId } = useParams();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [recipeName, setRecipeName] = useState();
  const [recipeDescription, setRecipeDescription] = useState();
  const [ingredientsText, setIngredientsText] = useState();
  const [stepsText, setStepsText] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  const history = useHistory();

  const recipe = props.recipeData.find((recipe) => +recipeId === recipe.id);

  if (!recipe) {
    console.log("conditional");
    return <NotFound></NotFound>;
  }

  const recipeIngredients = recipe.ingredients.map((ingredient) => {
    return <li>{ingredient}</li>;
  });

  const recipeSteps = recipe.steps.map((step) => {
    return <li>{step}</li>;
  });

  const ingredientsString = recipe.ingredients.reduce((a, b, i) => {
    if (i !== recipe.ingredients.length - 1) {
      return (a += b + "\n");
    }
    return (a += b);
  }, "");

  const stepsString = recipe.steps.reduce((a, b, i) => {
    if (i === recipe.steps.length - 1) {
      return (a += b);
    }
    return (a += b + "\n");
  }, "");

  const handleEditing = () => {
    setRecipeName(recipe.name);
    setRecipeDescription(recipe.description);
    setIngredientsText(ingredientsString);
    setStepsText(stepsString);
    setEditing((prevEditing) => !prevEditing);
    setIsDeleting(false);
  };

  const handleSaving = () => {
    const newName = recipeName;
    const newDescription = recipeDescription;
    const newIngredients = ingredientsText.split("\n");
    const newSteps = stepsText.split("\n");

    if (newName.length > 0 && newDescription.length > 0 && newIngredients.length > 0 && newSteps.length > 0) {
      const editedRecipe = {
        ...recipe,
        name: newName,
        description: newDescription,
        ingredients: newIngredients,
        steps: newSteps,
      };
  
      props.handleEditRecipe(editedRecipe);
      setEditing(false);
    } else {
      setError(true);
    }


  };

  const handleNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setRecipeDescription(event.target.value);
  };

  const handleIngredientsChange = (event) => {
    setIngredientsText(event.target.value);
  };

  const handleStepsChange = (event) => {
    setStepsText(event.target.value);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleDeleteConfirm = () => {
    console.log("deleted", recipe.id);
    console.log(props);
    props.handleDeleteRecipe(recipe.id);
    history.goBack();
  };

  const handleFocus = () => {
    setError(false)
  }

  return (
    <div className={classes["recipe-view"]}>
      {editing && <h1>Editing Recipe: {recipe.name}</h1>  }
      {editing ? (
        <>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={recipeName}
            onChange={handleNameChange}
            onFocus={handleFocus}
          />
        </>
      ) : (
        <h1>{recipe.name}</h1>
      )}
      {editing ? (
        <>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id="description"
            cols="30"
            rows="10"
            value={recipeDescription}
            onChange={handleDescriptionChange}
            onFocus={handleFocus}
          ></textarea>
        </>
      ) : (
        <p>{recipe.description}</p>
      )}
      {editing ? (
        <>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            name="ingredients"
            id="ingredients"
            cols="30"
            rows="10"
            value={ingredientsText}
            onChange={handleIngredientsChange}
            onFocus={handleFocus}
          ></textarea>
        </>
      ) : (
        <>
          <h2>Ingredients</h2>
          <ul>{recipeIngredients}</ul>
        </>
      )}
      {editing ? (
        <>
          <label htmlFor="steps">Steps</label>
          <textarea
            name="steps"
            id="steps"
            cols="30"
            rows="10"
            value={stepsText}
            onChange={handleStepsChange}
            onFocus={handleFocus}
          ></textarea>
        </>
      ) : (
        <>
          <h2>Steps</h2>
          <ol>{recipeSteps}</ol>
        </>
      )}
      {error && <div className={classes.error}>The inputs/text fields can't be empty.</div> }
      <div className={classes.actions}>
        {editing ? (
          <>
            <button onClick={handleSaving}>Save</button>
            <button className={classes.cancel} onClick={handleEditing}>
              Cancel
            </button>
            {isDeleting ? (
              <button
                className={`${classes.delete} ${classes["confirm-delete"]}`}
                onClick={handleDeleteConfirm}
              >
                Confirm
              </button>
            ) : (
              <button className={classes.delete} onClick={handleDelete}>
                Delete
              </button>
            )}
          </>
        ) : (
          <>
            <button onClick={handleEditing}>Edit</button>
            <button onClick={handleBack} className={classes.back}>
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeView;
