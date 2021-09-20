import styled from "styled-components";

const TopicList = styled.ul`
  background-color: #0a0a23;
  display: grid;
  gap: 20px;
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 50px;
  & > li {
    list-style: none;
  }
  & > p > a {
    transition: color .2s, background-color .2s;
    background-color: #f5f3ff;
    color: #3f3679;
    padding: 5px;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      background-color: #3f3679;
      color: #f5f3ff;
    }
  }

`;

export default TopicList;