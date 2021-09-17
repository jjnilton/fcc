import NewRecipeForm from "../components/NewRecipeForm";

const NewRecipe = (props) => {
  return (
      <NewRecipeForm handleAddNewRecipe={props.handleAddNewRecipe}></NewRecipeForm>
  );
};

export default NewRecipe;
