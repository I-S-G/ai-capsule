import { useEffect, useState } from "react";

import {
  createCapsule as createCapsuleApi,
  deleteCapsule as deleteCapsuleApi,
  getCapsules,
  logout as logoutApi,
  updateCapsule as updateCapsuleApi,
} from "@/api";

import type { Capsule, CapsuleFormData } from "@/types";

export function useCapsules() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadCapsules();
  }, []);

  async function loadCapsules() {
    try {
      setLoading(true);
      setError("");

      const data = await getCapsules();

      setCapsules(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load capsules.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function createCapsule(data: CapsuleFormData) {
    const capsule = await createCapsuleApi(data);

    setCapsules((current) => [capsule, ...current]);
  }

  async function updateCapsule(id: number, data: CapsuleFormData) {
    const capsule = await updateCapsuleApi(id, data);

    setCapsules((current) =>
      current.map((item) => (item.id === id ? capsule : item)),
    );
  }

  async function deleteCapsule(id: number) {
    await deleteCapsuleApi(id);

    setCapsules((current) => current.filter((item) => item.id !== id));
  }

  async function logout() {
    await logoutApi();

    window.location.href = "/";
  }

  return {
    capsules,
    loading,
    error,
    createCapsule,
    updateCapsule,
    deleteCapsule,
    logout,
  };
}
