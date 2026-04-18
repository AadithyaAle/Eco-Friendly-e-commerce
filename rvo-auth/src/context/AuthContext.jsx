import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext(null);

/**
 * Custom hook to access the auth context.
 * Throws an error if used outside of AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * AuthProvider — Wraps the app and provides authentication state & methods.
 *
 * Provides:
 *   - user           : Current Firebase user object (null if logged out)
 *   - loading         : True while auth state is being resolved
 *   - signup()        : Create account with email/password + display name
 *   - login()         : Sign in with email/password
 *   - logout()        : Sign out
 *   - googleLogin()   : Sign in with Google popup
 *   - resetPassword() : Send password reset email
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email, password, and display name
  async function signup(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Set the display name on the user profile
    await updateProfile(result.user, { displayName });

    // Send email verification
    await sendEmailVerification(result.user);

    return result;
  }

  // Sign in with email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign out
  function logout() {
    return signOut(auth);
  }

  // Sign in with Google
  function googleLogin() {
    return signInWithPopup(auth, googleProvider);
  }

  // Send password reset email
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Listen for auth state changes (persistent login)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    googleLogin,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
