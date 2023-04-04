
import { getFirestore, connectFirestoreEmulator, addDoc, collection, WithFieldValue, DocumentData, Firestore, Timestamp } from "firebase/firestore";
import { app } from "./init";

let db: Firestore;
if (import.meta.env.VITE_USEEMULATORS) {
  console.warn("VITE_USEEMULATORS is set to true. This should only happen locally...")
  db = getFirestore();
  connectFirestoreEmulator(db, 'localhost', 8080);
} else {
  db = getFirestore(app);
}

export const addDocument = async <T extends WithFieldValue<DocumentData>>(collectionName: string, doc: T) => {
  const collectionRef = collection(db, collectionName);
  return await addDoc(collectionRef, {
    updatedAt: Timestamp.fromMillis(Date.now()),
    ...doc
  });
}