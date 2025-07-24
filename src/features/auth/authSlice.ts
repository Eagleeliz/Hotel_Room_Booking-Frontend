import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types/Types';

// ✅ Normalize user object from localStorage and handle legacy keys
function normalizeUserFromStorage(): User | null {
  const stored = localStorage.getItem("user");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);

    // 🛠 Handle legacy user format with `id` instead of `userId`
    if (parsed && parsed.id && !parsed.userId) {
      parsed.userId = parsed.id;
      delete parsed.id;
    }

    return parsed;
  } catch (e) {
    console.error("Invalid user data in localStorage:", e);
    return null;
  }
}

// ✅ Initial auth state
const initialState: AuthState = {
  user: normalizeUserFromStorage(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

// ✅ Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // ✅ Persist to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // ✅ Clear from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
