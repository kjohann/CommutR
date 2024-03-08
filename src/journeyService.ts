import { 
  addDocument,
  getDocument,
  updateDocument,
  IDocument
} from "./firebase/firestore";

export type StopPlaceId = `${string}:${string}:${number}`

// Accessor key for legs: <order:number>-<startPoint>-<endPoint>
export type JourneyType = IDocument & {
  id: string;
  userId: string;
  name: string;
} & {
  [legKey: string]: LegType | undefined;
}

export type LegType = {
  startPoint: string
  endPoint: string
  normalTravelTimeInMinutes: number, // I can use green, yellow and red paths. Can use time < fastTravelTime as red
  fastTravelTimeInMinutes: number,
  order: number;
} & {
  [lineKey: string]: unknown | LegFare // don't really know if this is the way to go..
}

export function isLegType(obj: any): obj is LegType {
  return (
      typeof obj === 'object' &&
      obj !== null &&
      'startPoint' in obj &&
      'endPoint' in obj
  );
}

export type LegFare = {
  id: string,
  type: FareType,
  name: string,
  lineNumber: string
}

export enum FareType {
  Unknown = 'Unknown',
  Bus = 'Buss',
  Rail = 'Tog',
  Metro = 'T-bane',
  StreetAddress = 'Gateadresse'
}

export const JOURNEY_COLLECTION_NAME = 'Journey';

export const getJourney: (journeyId: string) => Promise<JourneyType> = async (journeyId: string) => {
  return await getDocument<JourneyType>(JOURNEY_COLLECTION_NAME, journeyId);
}

export const addJourney = async (name: string) => await addDocument(JOURNEY_COLLECTION_NAME, {
  name
});

export const formatLegKey = (leg: LegType) => `${leg.order}-${leg.startPoint}-${leg.endPoint}`

export const addLeg = async (journeyId: string, leg: LegType) => await updateDocument(JOURNEY_COLLECTION_NAME, journeyId, {
  [formatLegKey(leg)]: leg
});