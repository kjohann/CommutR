import { FC, useState } from 'react';
import { PlainButton } from '../../components/Buttons';
import { AddPointModal } from './components/AddPointModal';

type JourneyProps = {
  params: {
    id: string
  }
}


export const Journey: FC<JourneyProps> = ({ params }) => {
  const [isPointDialogOpen, setIsPointDialogOpen] = useState(false);
  
  return (
    <>
      <div>
        <PlainButton onClick={() => setIsPointDialogOpen(true)}>Add point</PlainButton>
        <AddPointModal 
          onClose={() => setIsPointDialogOpen(false)}
          isOpen={isPointDialogOpen}
        />
      </div>
    </>
  )
}
