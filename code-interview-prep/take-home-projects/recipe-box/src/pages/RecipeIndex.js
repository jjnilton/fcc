import RecipeList from "../components/RecipeList";

const RecipeIndex = (props) => {
  const recipeData = props.recipeData;
  return (
    <RecipeList recipeData={recipeData}></RecipeList>
  );
};

export default RecipeIndex;
