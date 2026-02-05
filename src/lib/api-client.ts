const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:3001";
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Si es una API Route de Next.js (empieza con /api/), no agregar BASE_URL
  const url = endpoint.startsWith("/api/")
    ? endpoint
    : `${getBaseUrl()}${endpoint}`;

  console.log("apiClient - endpoint:", endpoint);
  console.log("apiClient - final URL:", url);

  const response = await fetch(url, {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function get<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
  const queryString = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";
  return request<T>(`${endpoint}${queryString}`, { method: "GET" });
}

async function post<T>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function put<T>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

async function patch<T>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

async function del<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: "DELETE" });
}

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
};
