import { supabase } from "./superbaseClient";

export function createUser(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
  });
};

export function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export function signOut() {
  return supabase.auth.signOut();
};

export function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email);
};

export function updateUserPassword(password: string) {
  return supabase.auth.updateUser({ password });
}
