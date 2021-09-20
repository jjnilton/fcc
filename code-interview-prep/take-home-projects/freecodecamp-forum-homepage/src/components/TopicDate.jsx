import styled from "styled-components";

const StyledTopicDate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  font-size: 0.9em;
  color: #bcb5eb;
  & > div:nth-child(2) {
    justify-self: end;
  }
`;

const TopicDate = (props) => {
  return (
    <StyledTopicDate>
      <div>
        Created on{" "}
        {new Date(props.topic.created_at).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
      <div>
        Updated on{" "}
        {new Date(props.topic.last_posted_at).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
    </StyledTopicDate>
  );
};

export default TopicDate;
