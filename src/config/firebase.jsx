import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

/**
 * Firebase configuration object.
 * @constant
 * @type {Object}
 * @property {string} apiKey - The API key for Firebase.
 * @property {string} authDomain - The authentication domain for Firebase.
 * @property {string} projectId - The project ID for Firebase.
 * @property {string} storageBucket - The storage bucket for Firebase.
 * @property {string} messagingSenderId - The messaging sender ID for Firebase.
 * @property {string} appId - The app ID for Firebase.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};

/**
 * Initialize Firebase app.
 * @constant
 * @type {Object}
 */
const app = initializeApp(firebaseConfig);

/**
 * Initialize Firebase Authentication service.
 * @constant
 * @type {Object}
 */
export const auth = getAuth();

/**
 * Function to log in a user with email and password.
 * @function
 * @param {Object} param0 - The login credentials.
 * @param {string} param0.email - The user's email.
 * @param {string} param0.password - The user's password.
 * @returns {Promise<Object>} The user credential object.
 */
export const login = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Function to register a new user.
 * @async
 * @function
 * @param {Object} param0 - The registration details.
 * @param {string} param0.username - The user's username.
 * @param {string} param0.email - The user's email.
 * @param {string} param0.password - The user's password.
 * @returns {Promise<Object>} The user credential object.
 * @throws Will throw an error if registration fails.
 */
export const registro = async ({ username, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create a new user with email and password
    await updateProfile(userCredential.user, { displayName: username }); // Update the user's profile to include the username
    console.log('User registered:', userCredential.user);
    return userCredential;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Function to log out the authenticated user.
 * @function
 * @returns {Promise<void>} A promise that resolves when the user is logged out.
 */
export const logout = () => signOut(auth);