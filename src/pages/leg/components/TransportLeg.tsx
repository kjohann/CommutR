import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useColorModeValue,
  useSteps,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { PlacesResult } from "./PlacesResult";
import { PlaceResult, getPlaces } from "../../../entur/geocoderApi";

type TransportLegProps = {
  journeyId: string;
};

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const TransportLeg: FC<TransportLegProps> = ({ journeyId }) => {
  const [isActive, setIsActive] = useState(false);
  const [from, setFrom] = useState("");
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  });

  let activeContent = <Box>1</Box>;

  if (activeStep === 1) {
    activeContent = <Box>2</Box>;
  }

  if (activeStep === 2) {
    activeContent = <Box>3</Box>;
  }

  const performSearch = debounce(async (placeName: string) => {
    if (!placeName) {
      setPlaces([]);
      return;
    }
    
    const result = await getPlaces(placeName);
     // TODO: handle errors and such
    setPlaces(result.result ?? []);
  });

  return (
    <>
      <Stepper index={activeStep}>
        <Step onClick={() => setActiveStep(0)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>Fra</StepTitle>
            <StepDescription>Reis fra</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>Til</StepTitle>
            <StepDescription>Reis Til</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>Konfigurer</StepTitle>
            <StepDescription>Velg linjer</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      </Stepper>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        {isActive ? <CloseButton onClick={() => setIsActive(false)} /> : null}
        <FormControl isDisabled={!isActive}>
          <FormLabel>Avreisested</FormLabel>
          <Input type="text" onChange={async (e) => await performSearch(e.target.value)} />
        </FormControl>
        {!isActive ? (
          <Button onClick={() => setIsActive(true)}>Rediger</Button>
        ) : (
          <>
            <PlacesResult places={places} onClick={(place) => Promise.resolve(console.log(place))} />
          </>
        )}
      </Box>
    </>
  );
};
