import { FC } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLocation } from "wouter";
import { addLeg } from "../../../journeyService";
import * as routes from "../../../routes";

type TransitionLegProps = {
  journeyId: string;
};

interface FormValues {
  start: string;
  stop: string;
  normalTravelTime: number;
  fastTravelTime: number;
}

export const TransitionLeg: FC<TransitionLegProps> = ({ journeyId }) => {
  const [_, navigate] = useLocation();

  const onSubmit = async (values: FormValues, actions) => {
    actions.setSubmitting(true);
    await addLeg(journeyId, {
      startPoint: values.start,
      endPoint: values.stop,
      normalTravelTimeInMinutes: values.normalTravelTime,
      fastTravelTimeInMinutes: values.fastTravelTime,
      order: 1, // TODO
    });
    actions.setSubmitting(false);
    navigate(routes.journey.route(journeyId));
  };

  const initialValues: FormValues = {
    start: "",
    stop: "",
    normalTravelTime: 0,
    fastTravelTime: 0,
  };

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Heading size="lg" as="h3">Ny transportetappe</Heading>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props) => (
          <Form>
            <Field name="start">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.start && form.touched.start}
                >
                  <FormLabel>Start</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="stop">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.start && form.touched.start}
                >
                  <FormLabel>Stopp</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="normalTravelTime">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.start && form.touched.start}
                >
                  <FormLabel>Normal gangtid i minutter</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="fastTravelTime">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.start && form.touched.start}
                >
                  <FormLabel>Rask gangtid i minutter</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Lagre etappe
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
