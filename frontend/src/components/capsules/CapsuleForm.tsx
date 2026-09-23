import { useEffect, useState } from "react";

import type { ChangeEvent, SubmitEventHandler } from "react";

import type { CapsuleFormData } from "../../types";

import { Button } from "@/components/ui/button";

interface CapsuleFormProps {
  initialData?: CapsuleFormData;
  editing?: boolean;
  onSubmit: (data: CapsuleFormData) => Promise<void>;
  onCancel?: () => void;
}

const emptyCapsule: CapsuleFormData = {
  projectName: "",
  promptTitle: "",
  promptVersion: "",
  promptText: "",
  responseSummary: "",
  category: "",
  usefulness: "",
  reviewed: false,
  improved: false,
  screenshotUrl: "",
  notes: "",
};

function CapsuleForm({
  initialData = emptyCapsule,
  editing = false,
  onSubmit,
  onCancel,
}: CapsuleFormProps) {
  const [form, setForm] = useState<CapsuleFormData>(initialData);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialData);
    setError("");
  }, [initialData]);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void {
    const target = event.target;

    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setForm((current) => ({
      ...current,
      [target.name]: value,
    }));
  }

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await onSubmit(form);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save capsule.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Project Name */}
        <label className="text-sm font-medium">
          Project Name
          <input
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="AI Capsule"
            required
            className={inputClass}
          />
        </label>

        {/* Prompt Title */}
        <label className="text-sm font-medium">
          Prompt Title
          <input
            name="promptTitle"
            value={form.promptTitle}
            onChange={handleChange}
            placeholder="Generate React Component"
            required
            className={inputClass}
          />
        </label>

        {/* Prompt Version */}
        <label className="text-sm font-medium">
          Prompt Version
          <input
            name="promptVersion"
            value={form.promptVersion}
            onChange={handleChange}
            placeholder="v1.0"
            className={inputClass}
          />
        </label>

        {/* Category */}
        <label className="text-sm font-medium">
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Coding"
            className={inputClass}
          />
        </label>
      </div>

      {/* Prompt */}
      <label className="block text-sm font-medium">
        Prompt Text
        <textarea
          name="promptText"
          value={form.promptText}
          onChange={handleChange}
          placeholder="Enter your AI prompt..."
          required
          rows={7}
          className={inputClass}
        />
      </label>

      {/* Response Summary */}
      <label className="block text-sm font-medium">
        Response Summary
        <textarea
          name="responseSummary"
          value={form.responseSummary}
          onChange={handleChange}
          placeholder="Summarise the response you received..."
          rows={4}
          className={inputClass}
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Usefulness */}
        <label className="text-sm font-medium">
          Usefulness
          <select
            name="usefulness"
            value={form.usefulness}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select usefulness</option>

            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>
          </select>
        </label>

        {/* Screenshot URL */}
        <label className="text-sm font-medium">
          Screenshot URL
          <input
            type="url"
            name="screenshotUrl"
            value={form.screenshotUrl}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass}
          />
        </label>
      </div>

      {/* Notes */}
      <label className="block text-sm font-medium">
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional notes..."
          rows={4}
          className={inputClass}
        />
      </label>

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="reviewed"
            checked={form.reviewed}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Reviewed
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="improved"
            checked={form.improved}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Improved
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 border-t pt-5">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className=" cursor-pointer p-4"
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={loading}
          className=" cursor-pointer p-4"
        >
          {loading ? "Saving..." : editing ? "Update Capsule" : "Save Capsule"}
        </Button>
      </div>
    </form>
  );
}

export default CapsuleForm;
