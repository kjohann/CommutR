import styled from 'styled-components';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

export function Overview() {
  return (
    <Container>
      <div>
        <Logo src="/commutr.png" className="logo" alt="CommutR logo" />
      </div>
      <h1>CommutR</h1>
      <div className="Overview-container">

      </div>
    </Container>
  )
}
