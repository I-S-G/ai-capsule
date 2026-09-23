export interface Capsule {
  id: number;
  userId: string;
  projectName: string;
  promptTitle: string;
  promptVersion: string | null;
  promptText: string;
  responseSummary: string | null;
  category: string | null;
  usefulness: string | null;
  reviewed: boolean;
  improved: boolean;
  screenshotUrl: string | null;
  notes: string | null;
  createdAt: string;
}

export interface CapsuleFormData {
  projectName: string;
  promptTitle: string;
  promptVersion: string;
  promptText: string;
  responseSummary: string;
  category: string;
  usefulness: string;
  reviewed: boolean;
  improved: boolean;
  screenshotUrl: string;
  notes: string;
}
