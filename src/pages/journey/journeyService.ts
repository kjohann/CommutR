import { addDocument } from "../../firebase/firestore";

export type JourneyType = {
  id: string;
  userId: string;
  name: string;
  points: PointType[];
}

export type PointType = {
  name: string,
  order: number;
  transition?: TransitionType
}

export type TransitionType = {
  relaxedTime: number;
  stressedTime: number;
}

const JOURNEY_COLLECTION_NAME = 'Journey';

export const addJourney = async (name: string) => await addDocument(JOURNEY_COLLECTION_NAME, {
  name
});



export const addPoint = async (journeyId: string, {}: PointType) => {

}