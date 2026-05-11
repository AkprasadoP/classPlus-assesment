import { create } from 'zustand';

interface UserState {
  uid: string | null;
  name: string;
  photoURL: string;
  isPremium: boolean;
  isLoggedIn: boolean;
  setProfile: (updates: Partial<{ name: string; photoURL: string; isPremium: boolean }>) => void;
  login: (uid: string, name?: string, photoURL?: string) => void;
  logout: () => void;
}

// Default placeholder avatar
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=Guest&background=0D8ABC&color=fff';

export const useUserStore = create<UserState>((set) => ({
  uid: null,
  name: 'Guest User',
  photoURL: DEFAULT_AVATAR,
  isPremium: false,
  isLoggedIn: false,
  setProfile: (updates) => set((state) => ({ ...state, ...updates })),
  login: (uid, name, photoURL) => set({
    uid,
    isLoggedIn: true,
    name: name || 'New User',
    photoURL: photoURL || DEFAULT_AVATAR,
  }),
  logout: () => set({
    uid: null,
    isLoggedIn: false,
    name: 'Guest User',
    photoURL: DEFAULT_AVATAR,
    isPremium: false
  }),
}));
