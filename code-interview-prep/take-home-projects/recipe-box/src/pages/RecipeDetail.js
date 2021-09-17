import RecipeView from "../components/RecipeView";

const RecipeDetail = (props) => {
  return (
    <RecipeView
      recipeData={props.recipeData}
      handleEditRecipe={props.handleEditRecipe}
      handleDeleteRecipe={props.handleDeleteRecipe}
    ></RecipeView>
  );
};

export default RecipeDetail;
