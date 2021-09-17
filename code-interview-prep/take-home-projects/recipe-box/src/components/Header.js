import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName={classes.selected}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/recipes" activeClassName={classes.selected}>Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/new-recipe" activeClassName={classes.selected}>Add Recipe</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
