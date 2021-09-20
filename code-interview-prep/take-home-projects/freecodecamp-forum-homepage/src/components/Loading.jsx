import styled from "styled-components";

const StyledLoading = styled.div`
  color: white;
  text-align: center;
  & > div {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  & > div div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #fff;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  & > div div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  & > div div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  & > div div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

const Loading = () => {
  return (
    <StyledLoading>
      <p>Loading...</p>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Scroll to the bottom to see the code.</p>
    </StyledLoading>
  );
};

export default Loading;
