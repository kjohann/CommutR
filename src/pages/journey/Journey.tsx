import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { JOURNEY_COLLECTION_NAME, getJourney, isLegType } from '../../journeyService';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

type JourneyProps = {
  params: {
    journeyId: string
  }
}


export const Journey: FC<JourneyProps> = ({ params }) => {
  const { isLoading, error, data: journey } = useQuery({ queryKey: [JOURNEY_COLLECTION_NAME], queryFn: async () => await getJourney(params.journeyId) });
  
  
  if (isLoading || !journey) {
    console.log('Journey is loading');
    return null;
  }

  if (error) {
    console.error('That should\'n happen');
  }

  if (journey) {
    console.log('Journey loaded', journey);
  }

  const legs = Object.keys(journey).filter(key => isLegType(journey[key])).map(legKey => {
    const leg = journey[legKey]
    return (
      <Box key={legKey}>{leg!.startPoint} - {leg!.endPoint}</Box>
    )
  })

  return (
    <Flex align="center" direction="column">
      <Heading>{journey.name}</Heading>
      <Button as="a" href={`/journey/${params.journeyId}/newleg`}>Legg til etappe</Button>
      {legs}
    </Flex>
  )
}
