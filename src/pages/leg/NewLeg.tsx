import { FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLocation } from "wouter";
import { addLeg } from "../../journeyService";
import * as routes from '../../routes';

type NewLegProps = {
  params: {
    journeyId: string;
  };
};

interface MyFormValues {
  start: string;
  stop: string;
  normalTravelTime: number;
  fastTravelTime: number;
}


// TODO: refactor sånn at det hvertfall er en komponent per type form - kan hende warningen om implicit any type går bort da 🤷‍♂️
export const NewLeg: FC<NewLegProps> = ({ params }) => {
  const [_, navigate] = useLocation();
  
  const onSubmit = async (values: MyFormValues, actions) => {
    actions.setSubmitting(true);
    await addLeg(params.journeyId, {
      startPoint: values.start,
      endPoint: values.stop,
      normalTravelTimeInMinutes: values.normalTravelTime,
      fastTravelTimeInMinutes: values.fastTravelTime,
      order: 1 // TODO
    });
    actions.setSubmitting(false);
    navigate(routes.journey.route(params.journeyId))
  };

  const initialValues: MyFormValues = {
    start: "",
    stop: "",
    normalTravelTime: 0,
    fastTravelTime: 0,
  }

  return (
    <Container>
      <Stack>
        <Heading>Legg til ny etappe</Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Field name="start">
                  {( { field, form }) => (
                    <FormControl isInvalid={form.errors.start && form.touched.start}>
                      <FormLabel>Start</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>
                <Field name="stop">
                  {( { field, form }) => (
                    <FormControl isInvalid={form.errors.start && form.touched.start}>
                      <FormLabel>Stopp</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>
                <Field name="normalTravelTime">
                  {( { field, form }) => (
                    <FormControl isInvalid={form.errors.start && form.touched.start}>
                      <FormLabel>Normal gangtid i minutter</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>
                <Field name="fastTravelTime">
                  {( { field, form }) => (
                    <FormControl isInvalid={form.errors.start && form.touched.start}>
                      <FormLabel>Rask gangtid i minutter</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Lagre etappe
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Container>
  );
};
