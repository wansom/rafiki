import { firestoreDb } from './firebase';

import {
  collection,
  deleteField,
  doc,
  getDocs,
  onSnapshot,

  query,
  setDoc,
  updateDoc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';

const USERS_PATH = 'rafiki_users';
const QUESTIONS_PATH = 'anonymousQuiz';

export const firestoreListener = onSnapshot;
export const deleteDbField = deleteField();

interface QueryDataResult {
  data: DocumentData[];
  docs: DocumentSnapshot<DocumentData>[];
}

const getDocuments = (query: any): Promise<QueryDataResult> => {
  return getDocs(query).then((docs: any) => {
    return { data: formatQueryDataArray(docs), docs: docs.docs };
  });
};

// Assuming this is your function to format query data
const formatQueryDataArray = (docs: QuerySnapshot<DocumentData>): DocumentData[] => {
  // Implement your formatting logic here
  // For now, returning the data as-is
  return docs.docs.map((doc) => doc.data());
};

// Database functions
const usersRef = collection(firestoreDb, USERS_PATH);

const userRef = (userId: string): DocumentReference<DocumentData> => {
  return doc(firestoreDb, USERS_PATH, userId);
};

export const getAllUsers = (): Promise<QueryDataResult> => {
  return getDocuments(query(usersRef));
};

export const createNewUser = (payload: { uid: string; data: any }, navigateCallback: () => void): void => {
  setDoc(userRef(payload.uid), payload.data)
    .then(() => {
      // Document set successfully
      console.log('Document set successfully');
      navigateCallback();
    })
    .catch((error) => {
      // Handle errors if the document set fails
      console.error('Error setting document:', error);
    });
};

// Update user details function
export const updateUserDetails = async (payload: { uid: string; data: any }): Promise<void> => {
  try {
    await updateDoc(userRef(payload.uid), payload.data);
  } catch (error:any) {
    console.error('Error updating user details:', error.message);
  }
};

