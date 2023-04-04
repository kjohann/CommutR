import { FunctionComponent } from 'react';
import { Modal } from 'react-bootstrap';
import { PlainButton } from '../../components/Buttons';

type JourneyProps = {
  params: {
    id: string
  }
}


export const Journey: FunctionComponent<JourneyProps> = ({ params }) => {
  return (
    <>
      <div>
        <PlainButton>Add point</PlainButton>
      </div>
    </>
  )
}
