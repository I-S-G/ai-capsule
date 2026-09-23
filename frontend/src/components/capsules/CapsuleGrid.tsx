import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import CapsuleCard from "./CapsuleCard";

import type { Capsule } from "@/types";

interface CapsuleGridProps {
  capsules: Capsule[];
  loading: boolean;
  error: string;
  onCreate: () => void;
  onEdit: (capsule: Capsule) => void;
  onDelete: (id: number) => Promise<void>;
}

function CapsuleGrid({
  capsules,
  loading,
  error,
  onCreate,
  onEdit,
  onDelete,
}: CapsuleGridProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading capsules...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (capsules.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
          <h2 className="text-lg font-semibold">No capsules yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Start building your private prompt library.
          </p>
          <Button
            type="button"
            className="bg-pacific-cyan cursor-pointer py-7 px-6 "
            onClick={onCreate}
          >
            Add Capsule
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">My Capsules</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {capsules.length} {capsules.length === 1 ? "capsule" : "capsules"}{" "}
            saved
          </p>
        </div>

        <Button
          type="button"
          className="bg-pacific-cyan cursor-pointer py-7 px-6 "
          onClick={onCreate}
        >
          Add Capsule
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {capsules.map((capsule) => (
          <CapsuleCard
            key={capsule.id}
            capsule={capsule}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CapsuleGrid;
