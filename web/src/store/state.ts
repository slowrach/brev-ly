import { create } from "zustand";

export type Upload = {
  uploadId: string;
  originalLink: string;
  shortLink: string;
  accessNumber: number;
};

interface StateProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  saving: boolean;
  setSaving: (saving: boolean) => void;
  uploads: Upload[];
  setUploads: (uploads: Upload[]) => void;
  addUpload: (upload: Upload) => void;
  deleteUpload: (uploadId: string) => void;
}

export const useStates = create<StateProps>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  saving: false,
  setSaving: (saving) => set({ saving }),
  uploads: [],
  setUploads: (uploads) => set({ uploads }),
  addUpload: (upload) =>
    set((state) => ({
      uploads: [...state.uploads, upload],
    })),
  deleteUpload: (uploadId) =>
    set((state) => ({
      uploads: state.uploads.filter((upload) => upload.uploadId !== uploadId),
    })),
}));
