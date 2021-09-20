import styled from "styled-components";

const TopicInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 5px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export default TopicInfo;
