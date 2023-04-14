import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  signOut,
  reauthenticateWithCredential,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

/**
 * Create Firebase user with an email and password
 * @param {string} email Email of user
 * @param {string} password Password of user
 * @param {string} displayName Display name of user
 */
async function doCreateUserWithEmailAndPassword(
  email: string,
  password: string,
  displayName: string
) {
  await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser)
    updateProfile(auth.currentUser, { displayName: displayName });
}

/**
 * Change password for Firebase user by reauthenticating and then updating password
 * @param {string} email Email of user
 * @param {string} oldPassword Old password of user
 * @param {string} newPassword New password of user
 */
async function doChangePassword(
  email: string,
  oldPassword: string,
  newPassword: string
) {
  let credential = EmailAuthProvider.credential(email, oldPassword);
  if (auth.currentUser)
    await reauthenticateWithCredential(auth.currentUser, credential);
  if (auth.currentUser) await updatePassword(auth.currentUser, newPassword);
  // await doSignOut();
}

/**
 * Firebase user sign in with social media accounts i.e. Google
 * @param {string} provider Social media provider to sign in with
 */
async function doSocialSignIn(provider: string) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, socialProvider);
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * Firebase user sign in with email and password
 * @param {string} email Email of user
 * @param {string} password Password of user
 */
async function doSignInWithEmailAndPassword(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Firebase password reset
 * @param {string} email Email of user
 */
async function doPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Firebase password update
 * @param {string} password New password of user
 */
async function doPasswordUpdate(password: string) {
  if (auth.currentUser) await updatePassword(auth.currentUser, password);
}

/**
 * Firebase user sign out
 */
async function doSignOut() {
  await signOut(auth);
}

export default firebaseApp;

export {
  auth,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSocialSignIn,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
};
