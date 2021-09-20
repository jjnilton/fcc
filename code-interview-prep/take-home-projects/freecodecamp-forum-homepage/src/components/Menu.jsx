import styled from "styled-components";

const StyledMenu = styled.div`
  background-color: #1b1b46c1;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 5px;
  display: grid;
  justify-items: center;
  transform: ${(props) => (props.visible ? "scale(1)" : "scaleY(0)")};
  transform-origin: bottom;
  transition: transform 0.2s;

  & > div {
    margin: 0 auto;

    & > button {
      width: 100px;
      padding: 10px;
      margin: 5px;
      background-color: #0a0a23;
      border: none;
      color: white;
      cursor: pointer;
      transition: color 0.5s, background-color 0.5s;
      &:hover {
        background-color: #111141;
      }
      &:disabled {
        background-color: #757586;
        color: #3d3d4e;
        cursor: not-allowed;
      }
    }
  }
`;

const Menu = (props) => {
  const handleRefresh = () => {
    props.refresh();
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledMenu visible={props.visible}>
      <div>
        <button onClick={handleRefresh} disabled={!props.isLoaded}>
          Refresh
        </button>
        <button onClick={handleScrollUp} disabled={props.ontop}>
          Go up
        </button>
      </div>
    </StyledMenu>
  );
};

export default Menu;
