import { apiClient } from "./api-client";

describe("apiClient", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      NEXT_PUBLIC_BACK_URL: "http://backend.test",
    };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = ORIGINAL_ENV;
  });

  it("should call fetch with BASE_URL for non /api endpoints", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: [] }),
    });

    await apiClient.get("/orders");

    expect(fetch).toHaveBeenCalledWith(
      "http://backend.test/orders",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Accept: "*/*",
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("should NOT prepend BASE_URL for /api routes", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: [] }),
    });

    await apiClient.get("/api/orders");

    expect(fetch).toHaveBeenCalledWith(
      "/api/orders",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("should append query params correctly", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    await apiClient.get("/orders", { page: 2, per_page: 10, active: true });

    expect(fetch).toHaveBeenCalledWith(
      "http://backend.test/orders?page=2&per_page=10&active=true",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("should send POST request with JSON body", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: 1 }),
    });

    await apiClient.post("/orders", { name: "Test" });

    expect(fetch).toHaveBeenCalledWith(
      "http://backend.test/orders",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Test" }),
      }),
    );
  });

  it("should throw error when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(apiClient.get("/orders")).rejects.toThrow(
      "API Error: 500 Internal Server Error",
    );
  });
});
