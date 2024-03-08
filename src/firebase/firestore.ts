
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  doc,
  WithFieldValue,
  DocumentData,
  Firestore,
  addDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
  CollectionReference
} from "firebase/firestore";
import { app } from "./init";

let db: Firestore;
if (import.meta.env.VITE_USEEMULATORS) {
  console.warn("VITE_USEEMULATORS is set to true. This should only happen locally...")
  db = getFirestore();
  connectFirestoreEmulator(db, 'localhost', 8080);
} else {
  db = getFirestore(app);
}

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

export type IDocument = {
  updatedAt: { 
    seconds: number, 
    nanoseconds: number, 
    toDate: () => Date 
  }
}


export const getDocument = async <T extends IDocument>(collectionName: string, documentId: string) => {
  const docRef = doc(createCollection<T>(collectionName), documentId)
  const document = (await getDoc(docRef));
  
  if (!document.exists()) {
    // TODO: can this fail when offline? Force fetch from cache before failing completely?
    throw new Error(`Could not find document with id ${documentId}`);
  }

  const data = document.data();
  return {
    id: document.id,
    ...data,
    updatedAt: data.updatedAt.toDate()
  };
}


export const addDocument = async <T extends WithFieldValue<DocumentData>>(collectionName: string, document: T) => {
  const collectionRef = collection(db, collectionName);
  return await addDoc(collectionRef, {
    updatedAt: serverTimestamp(),
    ...document
  });
}


export const updateDocument = async <T extends WithFieldValue<DocumentData>>(collectionName: string, documentId: string, props: T) => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    updatedAt: serverTimestamp(),
    ... props
  });
}