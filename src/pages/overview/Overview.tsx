import styled from 'styled-components';
import { addJourney } from '../journey/journeyService';
import { useLocation } from 'wouter';

const LogoContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
`;

const Content = styled.div`
  text-align: center;
`;

const InputContainer = styled.div`

`;


export function Overview() {
  const [_, setLocation] = useLocation();
  const createNewJourney = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget
    const formElements = form.elements as typeof form.elements & {
      'create-journey-input': HTMLInputElement
    }

    const response = await addJourney(formElements['create-journey-input'].value);
    setLocation(`/journey/${response.id}`);
  }
  
  return (
    <>
      <LogoContainer>
        <div>
          <Logo src="/commutr.png" alt="CommutR logo" />
        </div>
        <h1>CommutR</h1>
      </LogoContainer>
      <Content>
        <form onSubmit={createNewJourney}>
        <InputContainer>
        	<input id="create-journey-input" type="text" placeholder="Opprett en ny reise" />
        </InputContainer>
        <button type="submit">Opprett</button>
        </form>
      </Content>
    </>
  )
}
