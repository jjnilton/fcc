import styled from "styled-components";

const StyledTopicPosters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-gap: 5px;
  }

  margin-top: 10px;
  font-size: 0.9em;
  color: #bcb5eb;
  background: linear-gradient(to right, #242455, #1c1c46) ;
    padding: 5px;
  & > div:nth-child(1) {
  }
  & > div:nth-child(2) {
    & > ul {
      padding: 0;
      margin: 0;
      & > li {
        list-style: none;
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
  & a {
    text-decoration: none;
    color: #8778e6;
    &.original-poster {
      font-weight: bold;
    }
  }
`;

const TopicPosters = (props) => {
  const getParticipants = (topic) => {
    const participants = topic.posters.map(
      (poster) => ({
        user: props.getUserFromUserId(poster.user_id),
        description: poster.description,
      })
      // props.getUserFromUserId(poster.user_id)
    );
    return participants.reverse();
  };

  return (
    <StyledTopicPosters>
      <div>
        <div>Most Recent Poster</div>
        <a
          href={`${props.forumUrl}/u/${
            props.getLastPoster(props.topic).username
          }`}
        >
          {props.getLastPoster(props.topic).username}
        </a>
      </div>
      <div>
        <div>Participants</div>
        <ul>
          {getParticipants(props.topic).map((participant) => (
            <li key={participant.user.id}>
              <a
                className={
                  participant.description.includes("Original") ?
                  "original-poster" : undefined
                }
                href={`${props.forumUrl}/u/${participant.user.username}`}
              >
                {participant.user.username}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </StyledTopicPosters>
  );
};

export default TopicPosters;
