import { addDocument } from "../../firebase/firestore";

const COLLECTION_NAME = 'Journey';

export const addJourney = async (journeyName: string) => await addDocument(COLLECTION_NAME, {
  journeyName
});