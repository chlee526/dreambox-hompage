import { create } from 'zustand';

interface ContactModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useContactModalStore = create<ContactModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
