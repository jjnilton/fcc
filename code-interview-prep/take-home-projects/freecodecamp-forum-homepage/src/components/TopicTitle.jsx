import styled from "styled-components";

const TopicTitle = styled.div`
  & > a {
    text-decoration: none;
    font-size: 1.5em;
    color: #e6e2ff;

    &:hover {
      color: slateblue;
      transition: color 200ms;
    }
  }
`;

export default TopicTitle;