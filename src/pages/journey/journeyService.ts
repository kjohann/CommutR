import { 
  addDocument,
  getDocument,
  updateDocument,
  IDocument
} from "../../firebase/firestore";

// TODO: probably use interface instead so I can do extend
export type StopPlaceId = {
  id: string
}

export type JourneyType = IDocument & {
  id: string;
  userId: string;
  name: string;
} & {
  [stopPlaceId: string]: PointType | undefined;
}

export type PointType = {
  name: string,
  stopPlaceId: string,
  order: number;
  transition?: TransitionType
}

export function isPointType(obj: any): obj is PointType {
  return (
      typeof obj === 'object' &&
      obj !== null &&
      'stopPlaceId' in obj
  );
}

export type Fare = {

}

export enum FareType {
  Unknown = 'Unknown',
  Bus = 'Buss',
  Rail = 'Tog',
  Metro = 'T-bane',
  StreetAddress = 'Gateadresse'
}

export type TransitionType = {
  relaxedTime: number;
  stressedTime: number;
}

export const JOURNEY_COLLECTION_NAME = 'Journey';

export const getJourney: (journeyId: string) => Promise<JourneyType> = async (journeyId: string) => {
  return await getDocument<JourneyType>(JOURNEY_COLLECTION_NAME, journeyId);
}

export const addJourney = async (name: string) => await addDocument(JOURNEY_COLLECTION_NAME, {
  name
});

export const addPoint = async (journeyId: string, point: PointType) => await updateDocument(JOURNEY_COLLECTION_NAME, journeyId, {
  [point.stopPlaceId]: point
});