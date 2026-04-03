import {
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

// Google Login
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// Logout
export const logoutUser = async () => {
  return await signOut(auth);
};

// Setup Recaptcha
export const setupRecaptcha = (containerId) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    containerId,
    {
      size: "invisible",
    }
  );
};

// Send OTP
export const sendOTP = async (phoneNumber) => {
  const appVerifier = window.recaptchaVerifier;
  return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};