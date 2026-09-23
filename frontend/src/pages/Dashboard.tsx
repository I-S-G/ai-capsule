import { useState } from "react";

import DashboardHeader from "@/components/layout/DashboardHeader";
import CapsuleGrid from "@/components/capsules/CapsuleGrid";
import CapsuleDialog from "@/components/capsules/CapsuleDialog";

import { useCapsules } from "@/hooks/useCapsules";

import type { Capsule } from "@/types";

function Dashboard() {
  const {
    capsules,
    loading,
    error,
    createCapsule,
    updateCapsule,
    deleteCapsule,
    logout,
  } = useCapsules();

  const [createOpen, setCreateOpen] = useState(false);
  const [editingCapsule, setEditingCapsule] = useState<Capsule | null>(null);

  async function handleCreate(
    data: Parameters<typeof createCapsule>[0],
  ): Promise<void> {
    await createCapsule(data);
    setCreateOpen(false);
  }

  async function handleUpdate(
    data: Parameters<typeof updateCapsule>[1],
  ): Promise<void> {
    if (!editingCapsule) {
      return;
    }

    await updateCapsule(editingCapsule.id, data);
    setEditingCapsule(null);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <DashboardHeader onLogout={logout} />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <CapsuleGrid
          capsules={capsules}
          loading={loading}
          error={error}
          onCreate={() => setCreateOpen(true)}
          onEdit={setEditingCapsule}
          onDelete={deleteCapsule}
        />
      </div>

      <CapsuleDialog
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
      />

      <CapsuleDialog
        mode="edit"
        capsule={editingCapsule}
        open={editingCapsule !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingCapsule(null);
          }
        }}
        onSubmit={handleUpdate}
      />
    </main>
  );
}

export default Dashboard;
