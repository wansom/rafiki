import { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  User,
  signInAnonymously
} from 'firebase/auth'
import { createAnonUserRecord } from './firestore';

export const createUser = async (values: { email: string; password: string }): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

export const signIn = async (values: { email: string; password: string }): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email.trim(),
      values.password.trim()
    )
    return userCredential.user
  } catch (error) {
    throw error
  }
}

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

export const passwordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw error
  }
}

export const changePassword = async (newPassword: string): Promise<void> => {
  try {
    const user = auth.currentUser
    if (user) {
      await updatePassword(user, newPassword)
    } else {
      throw new Error('User not authenticated.')
    }
  } catch (error) {
    throw error
  }
}

export const currentUser = (): boolean => {
  return !!auth.currentUser
}

export const signUserInAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    createAnonUserRecord(user.uid)   
  } catch (error) {
    console.error('Error signing in anonymously:', error);
  }
};
