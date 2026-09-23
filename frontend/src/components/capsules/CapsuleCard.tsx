import type { Capsule } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface CapsuleCardProps {
  capsule: Capsule;
  onEdit: (capsule: Capsule) => void;
  onDelete: (id: number) => Promise<void>;
}

function CapsuleCard({ capsule, onEdit, onDelete }: CapsuleCardProps) {
  async function handleDelete(): Promise<void> {
    const confirmed = window.confirm(
      "Are you sure you want to delete this capsule?",
    );

    if (!confirmed) {
      return;
    }

    await onDelete(capsule.id);
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <p className="text-muted-foreground pb-2">
          {new Intl.DateTimeFormat("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(capsule.createdAt))}
        </p>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <CardTitle className="truncate">{capsule.promptTitle}</CardTitle>

            <CardDescription className="mt-1">
              {capsule.projectName}
            </CardDescription>
          </div>

          {capsule.category && (
            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {capsule.category}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Prompt
          </p>

          <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-6">
            {capsule.promptText}
          </pre>
        </div>

        {capsule.responseSummary && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Response Summary
            </p>

            <p className="text-sm leading-6 text-muted-foreground">
              {capsule.responseSummary}
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {capsule.usefulness && (
            <span className="rounded-full bg-muted px-3 py-1 text-xs">
              Usefulness: {capsule.usefulness}
            </span>
          )}

          {capsule.reviewed && (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              Reviewed
            </span>
          )}

          {capsule.improved && (
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
              Improved
            </span>
          )}
        </div>

        {capsule.screenshotUrl && (
          <div className="mt-5">
            <a
              href={capsule.screenshotUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View Screenshot
            </a>
          </div>
        )}

        {capsule.notes && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Notes
            </p>

            <p className="text-sm leading-6 text-muted-foreground">
              {capsule.notes}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          type="button"
          className="cursor-pointer"
          variant="outline"
          onClick={() => onEdit(capsule)}
        >
          Edit
        </Button>

        <Button
          type="button"
          variant="destructive"
          className="cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CapsuleCard;
