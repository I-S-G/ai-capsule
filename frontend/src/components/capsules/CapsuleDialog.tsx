import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CapsuleForm from "./CapsuleForm";

import type { Capsule, CapsuleFormData } from "@/types";

interface CapsuleDialogProps {
  mode: "create" | "edit";
  open: boolean;
  capsule?: Capsule | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CapsuleFormData) => Promise<void>;
}

function CapsuleDialog({
  mode,
  open,
  capsule,
  onOpenChange,
  onSubmit,
}: CapsuleDialogProps) {
  const editing = mode === "edit";

  const initialData: CapsuleFormData | undefined =
    editing && capsule
      ? {
          projectName: capsule.projectName,
          promptTitle: capsule.promptTitle,
          promptVersion: capsule.promptVersion ?? "",
          promptText: capsule.promptText,
          responseSummary: capsule.responseSummary ?? "",
          category: capsule.category ?? "",
          usefulness: capsule.usefulness ?? "",
          reviewed: capsule.reviewed,
          improved: capsule.improved,
          screenshotUrl: capsule.screenshotUrl ?? "",
          notes: capsule.notes ?? "",
        }
      : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Edit Capsule" : "Create Capsule"}
          </DialogTitle>

          <DialogDescription>
            {editing
              ? "Update your saved AI prompt."
              : "Save a new AI prompt to your private library."}
          </DialogDescription>
        </DialogHeader>

        <CapsuleForm
          initialData={initialData}
          editing={editing}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CapsuleDialog;
