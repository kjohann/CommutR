import { FC, useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { TransitionLeg } from './components/TransitionLeg';
import { TransportLeg } from "./components/TransportLeg";

type NewLegProps = {
  params: {
    journeyId: string;
  };
};

export const NewLeg: FC<NewLegProps> = ({ params }) => {
  const [addTransportLeg, setAddTransportLeg] = useState(false);
  
  const mainComponent = addTransportLeg
    ? <TransportLeg journeyId={params.journeyId} />
    : <TransitionLeg journeyId={params.journeyId} />;

  return (
    <Container>
      <Stack>
        <Heading>Legg til ny etappe</Heading>
        <FormControl display="flex" alignItems="center">
          <FormLabel>Legg til kollektivtransport etappe?</FormLabel>
          <Switch onChange={(e) => setAddTransportLeg(e.target.checked)} isChecked={addTransportLeg} />
        </FormControl>
        {mainComponent}
      </Stack>
    </Container>
  );
};
