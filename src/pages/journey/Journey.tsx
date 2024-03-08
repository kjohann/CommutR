import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { JOURNEY_COLLECTION_NAME, getJourney } from './journeyService';
import { Button } from '@chakra-ui/react';

type JourneyProps = {
  params: {
    journeyId: string
  }
}


export const Journey: FC<JourneyProps> = ({ params }) => {
  const { isLoading, error, data } = useQuery({ queryKey: [JOURNEY_COLLECTION_NAME], queryFn: async () => await getJourney(params.journeyId) });
  const [isPointDialogOpen, setIsPointDialogOpen] = useState(false);
  
  if (isLoading || !data) {
    console.log('Journey is loading');
    return null;
  }

  if (error) {
    console.error('That should\'n happen');
  }

  if (data) {
    console.log('Journey loaded', data);
  }

  return (
    <>
        <Button as="a" href={`/journey/${params.journeyId}/leg`}>Legg til etappe</Button>
    </>
  )
}
