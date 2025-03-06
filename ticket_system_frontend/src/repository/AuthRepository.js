import { loginRequest,signupRequest,fetchAllRoles, logoutRequest } from '../services/AuthService';
import { auth} from '../Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';

export const getRoles = async () => {
  try {
    return await fetchAllRoles();
  } catch (error) {
    throw error;
  }
};
export const registerUser = async (email, password, roleId) => {
  if (!roleId) {
    throw new Error('Role ID is missing. Please select a role.');
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    const uid = userCredential.user.uid;
    console.log('Firebase user created with UID:', uid);
    await signupRequest(roleId,uid,email);
    return { success: true, message: 'User registered successfully. Verification email sent.' };
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
};
export const loginService = async (email,password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
   console.log("user",user);
      if (!user.emailVerified) {
        console.log('Please verify your email before logging in. Check your email inbox!');
        throw new Error('Please verify your email before logging in. Check your email inbox!');
      }
  if (user) {
    const idToken = await user.getIdToken(true); 
    const refreshToken = user.refreshToken; 
    console.log("refreshToken",refreshToken);
    return await loginRequest(idToken, refreshToken);
  }
  throw new Error('User not authenticated');
};

export const logoutService = async () => {
  console.log("logout at service");
  await logoutRequest();
  auth.signOut();
  window.location.reload();
};
export const forgotPassword=async(email)=>{
  await sendPasswordResetEmail(auth, email);
}



