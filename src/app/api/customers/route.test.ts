type CustomersNextJsonInit = { status?: number };
type CustomersNextJsonMock = jest.Mock<unknown, [unknown, CustomersNextJsonInit?]>;

const customersNextJsonMock: CustomersNextJsonMock = jest.fn();

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: CustomersNextJsonInit) =>
      customersNextJsonMock(body, init),
  },
}));

type CustomersGET = () => Promise<unknown>;
type CustomersPOST = (request: Request) => Promise<unknown>;

type CustomersRouteHandlers = {
  GET: CustomersGET;
  POST: CustomersPOST;
};

type CustomersRequestJson = Pick<Request, 'json'>;

describe('API Route /api/customers', () => {
  const ORIGINAL_ENV = process.env;

  let route: CustomersRouteHandlers;
  let fetchMock: jest.MockedFunction<typeof fetch>;

  beforeEach(async () => {
    jest.clearAllMocks();

    process.env = {
      ...ORIGINAL_ENV,
      NEXT_PUBLIC_CUSTOMERS_API_URL: 'http://customers.test',
    };

    fetchMock = jest.fn() as unknown as jest.MockedFunction<typeof fetch>;
    globalThis.fetch = fetchMock;

    jest.resetModules();
    route = (await import('./route')) as unknown as CustomersRouteHandlers;
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('GET', () => {
    it('fetches customers and returns json when ok', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue([{ id: 1, customer_name: 'Ana' }]),
      } as unknown as Response);

      await route.GET();

      expect(fetchMock).toHaveBeenCalledWith(
        'http://customers.test/customers',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      );

      expect(customersNextJsonMock).toHaveBeenCalledWith(
        [{ id: 1, customer_name: 'Ana' }],
        undefined
      );
    });

    it('returns 500 with details when response is not ok (reads response.text)', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: jest.fn().mockResolvedValue('Backend exploded'),
      } as unknown as Response);

      await route.GET();

      expect(customersNextJsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Error al obtener los clientes',
          details: expect.any(String),
        }),
        { status: 500 }
      );
    });

    it('returns 500 with details when fetch throws', async () => {
      fetchMock.mockRejectedValueOnce(new Error('network down'));

      await route.GET();

      expect(customersNextJsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Error al obtener los clientes',
          details: expect.any(String),
        }),
        { status: 500 }
      );
    });
  });

  describe('POST', () => {
    it('posts customer payload and returns json when ok', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: jest.fn().mockResolvedValue({ id: 1, customer_name: 'Ana' }),
      } as unknown as Response);

      const req: CustomersRequestJson = {
        json: async () => ({ customer_name: 'Ana', address: 'Calle 1' }),
      };

      await route.POST(req as unknown as Request);

      expect(fetchMock).toHaveBeenCalledWith(
        'http://customers.test/customers',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { customer_name: 'Ana', address: 'Calle 1' },
          }),
        })
      );

      expect(customersNextJsonMock).toHaveBeenCalledWith(
        { id: 1, customer_name: 'Ana' },
        undefined
      );
    });
  });
});
