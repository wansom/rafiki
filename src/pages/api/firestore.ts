import { firestoreDb } from './firebase'

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
  increment
} from 'firebase/firestore'

const USERS_PATH = 'rafiki_users'

export const firestoreListener = onSnapshot
export const deleteDbField = deleteField()

interface QueryDataResult {
  data: DocumentData[]
  docs: DocumentSnapshot<DocumentData>[]
}

const getDocuments = (query: any): Promise<QueryDataResult> => {
  return getDocs(query).then((docs: any) => {
    return { data: formatQueryDataArray(docs), docs: docs.docs }
  })
}

// Assuming this is your function to format query data
const formatQueryDataArray = (docs: QuerySnapshot<DocumentData>): DocumentData[] => {
  // Implement your formatting logic here
  // For now, returning the data as-is
  return docs.docs.map((doc) => doc.data())
}

// Database functions
const usersRef = collection(firestoreDb, USERS_PATH)

const userRef = (userId: string): DocumentReference<DocumentData> => {
  return doc(firestoreDb, USERS_PATH, userId)
}

export const getAllUsers = (): Promise<QueryDataResult> => {
  return getDocuments(query(usersRef))
}

export const createNewUser = (
  payload: { uid: string; data: any },
  navigateCallback: () => void
): void => {
  setDoc(userRef(payload.uid), payload.data)
    .then(() => {
      // Document set successfully
      console.log('Document set successfully')
      navigateCallback()
    })
    .catch((error) => {
      // Handle errors if the document set fails
      console.error('Error setting document:', error)
    })
}

// Update user details function
export const updateUserDetails = async (payload: { uid: string; data: any }): Promise<void> => {
  try {
    await updateDoc(userRef(payload.uid), payload.data)
  } catch (error: any) {
    console.error('Error updating user details:', error.message)
  }
}

export const createAnonUserRecord = async (uid: string) => {
  const userRef = doc(firestoreDb, USERS_PATH, uid);

  try {
    await setDoc(userRef, {
      messagesCount: 0,
    });

    console.log('User record created in Firestore:', uid);
  } catch (error) {
    console.error('Error creating user record:', error);
  }
};

export const incrementMessageCount = async (uid: string) => {
  const userRef = doc(firestoreDb, USERS_PATH, uid);

  try {
    await updateDoc(userRef, {
      messagesCount: increment(1),
    });

    console.log('Message count incremented for user:', uid);
  } catch (error) {
    console.error('Error incrementing message count:', error);
  }
};


export const watchUserMessages = (uid: string, onMessagesChange: (count: number) => void) => {
  const userRef = doc(firestoreDb, USERS_PATH, uid);

  const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
    const messagesCount = docSnapshot.data()?.messagesCount || 0;
    onMessagesChange(messagesCount);
  });

  return unsubscribe;
};