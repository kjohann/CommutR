
import { getFirestore, connectFirestoreEmulator, addDoc, collection, doc, WithFieldValue, DocumentData, Firestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { app } from "./init";

let db: Firestore;
if (import.meta.env.VITE_USEEMULATORS) {
  console.warn("VITE_USEEMULATORS is set to true. This should only happen locally...")
  db = getFirestore();
  connectFirestoreEmulator(db, 'localhost', 8080);
} else {
  db = getFirestore(app);
}

export const addDocument = async <T extends WithFieldValue<DocumentData>>(collectionName: string, document: T) => {
  const collectionRef = collection(db, collectionName);
  return await addDoc(collectionRef, {
    updatedAt: serverTimestamp(),
    ...document
  });
}

// TODO: kanskje begynne i andre enden her.. Se hvordan det funker om jeg har en realTime-ref til et dokument (Journey) og så hvordan jeg kan oppdatere den.
export const updateDocument = async <T extends WithFieldValue<DocumentData>>(collectionName: string, documentId: string, props: T) => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    updatedAt: serverTimestamp(),
    ... props
  });
}