import styled from "styled-components";

const TopicStat = styled.div`
  color: #e6e2ff;
  & > div:nth-child(1) {
    font-size: 0.75em;
    text-align: right;
    white-space: nowrap;
  }

  & > div:nth-child(2) {
    font-size: 2em;
    background-color: #0a0a23;
    text-align: center;
    margin-top: 5px;
    padding: 5px;
  }
`;

export default TopicStat;
