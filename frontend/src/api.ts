import type { Capsule, CapsuleFormData } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiError extends Error {
  status?: number;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : "Something went wrong";

    const error: ApiError = new Error(message);

    error.status = response.status;

    throw error;
  }

  return data as T;
}

export function getCapsules(): Promise<Capsule[]> {
  return request<Capsule[]>("/api/capsules");
}

export function createCapsule(capsule: CapsuleFormData): Promise<Capsule> {
  return request<Capsule>("/api/capsules", {
    method: "POST",
    body: JSON.stringify(capsule),
  });
}

export function updateCapsule(
  id: number,
  capsule: CapsuleFormData,
): Promise<Capsule> {
  return request<Capsule>(`/api/capsules/${id}`, {
    method: "PUT",
    body: JSON.stringify(capsule),
  });
}

export function deleteCapsule(id: number): Promise<void> {
  return request<void>(`/api/capsules/${id}`, {
    method: "DELETE",
  });
}

export function logout(): Promise<void> {
  return request<void>("/api/auth/logout", {
    method: "POST",
  });
}
