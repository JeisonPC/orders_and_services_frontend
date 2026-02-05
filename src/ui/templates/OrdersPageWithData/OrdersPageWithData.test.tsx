import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";

import { OrdersPageWithData } from "./OrdersPageWithData";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { useCustomerStore } from "@/store/customerStore";

// ---- mocks ----
jest.mock("@/features/orders/hooks/useOrders", () => ({
  useOrders: jest.fn(),
}));

jest.mock("@/store/customerStore", () => ({
  useCustomerStore: jest.fn(),
}));

jest.mock("@/features/orders/config/ordersTableColumns", () => ({
  ordersTableColumns: [{ key: "id", label: "ID" }],
}));

jest.mock("@/features/orders/components/OrdersPageActions", () => ({
  OrdersPageActions: () => <div data-testid="orders-actions">actions</div>,
}));

jest.mock("@/ui/organisms/PageLayout", () => ({
  PageLayout: ({
    title,
    actions,
    children,
  }: {
    title: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <section>
      <h1>{title}</h1>
      <div data-testid="page-actions">{actions}</div>
      <div data-testid="page-children">{children}</div>
    </section>
  ),
}));

type TableCapturedProps = {
  data: unknown[];
  columns: unknown;
  isLoading?: boolean;
  getRowKey: (row: unknown) => string | number;
  pagination?:
    | {
        currentPage: number;
        totalPages: number;
        perPage: number;
        onPageChange: (page: number) => void;
        onPerPageChange: (perPage: number) => void;
      }
    | undefined;
};

const tableMock = jest.fn((props: unknown) => {
  const p = props as TableCapturedProps;
  return <div data-testid="table">{p.isLoading ? "loading" : "ready"}</div>;
});

jest.mock("@/ui/organisms/Table", () => ({
  Table: (props: unknown) => tableMock(props),
}));

// ---- types for hook returns ----
type Customer = { id: number; customer_name: string };
type OrdersResponse = {
  data: Array<{ id: number }>;
  pagination?: { current_page: number; total_pages: number };
};

describe("OrdersPageWithData", () => {
  const useOrdersMock = useOrders as unknown as jest.MockedFunction<
    typeof useOrders
  >;
  const useCustomerStoreMock =
    useCustomerStore as unknown as jest.MockedFunction<typeof useCustomerStore>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders generic title and helper message when no customer is selected", () => {
    useCustomerStoreMock.mockReturnValue({
      customerSelected: null,
    } as unknown as {
      customerSelected: Customer | null;
    });

    useOrdersMock.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as {
      data: OrdersResponse | undefined;
      isLoading: boolean;
    });

    render(<OrdersPageWithData />);

    expect(
      screen.getByRole("heading", { name: "Pedidos" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("orders-actions")).toBeInTheDocument();

    expect(
      screen.getByText("Selecciona un cliente para ver sus pedidos"),
    ).toBeInTheDocument();

    // No debería renderizar la tabla cuando no hay customer
    expect(screen.queryByTestId("table")).not.toBeInTheDocument();
  });

  it("renders customer-specific title and table when customer is selected", () => {
    useCustomerStoreMock.mockReturnValue({
      customerSelected: { id: 1, customer_name: "Ana" },
    } as unknown as { customerSelected: Customer });

    useOrdersMock.mockReturnValue({
      data: {
        data: [{ id: 10 }, { id: 11 }],
        pagination: { current_page: 2, total_pages: 5 },
      },
      isLoading: true,
    } as unknown as { data: OrdersResponse; isLoading: boolean });

    render(<OrdersPageWithData />);

    expect(
      screen.getByRole("heading", { name: "Pedidos de Ana" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("table")).toHaveTextContent("loading");

    // useOrders debe llamarse con (customerId, currentPage, perPage)
    // currentPage default = 1, perPage default = 10
    expect(useOrdersMock).toHaveBeenCalledWith(1, 1, 10);

    // Validar props pasadas a la tabla
    const props = tableMock.mock.calls[0][0] as TableCapturedProps;
    expect(props.data).toEqual([{ id: 10 }, { id: 11 }]);
    expect(props.columns).toEqual([{ key: "id", label: "ID" }]);
    expect(props.isLoading).toBe(true);

    // getRowKey funciona
    expect(props.getRowKey({ id: 99 })).toBe(99);

    // pagination mapea bien
    expect(props.pagination?.currentPage).toBe(2);
    expect(props.pagination?.totalPages).toBe(5);
    expect(props.pagination?.perPage).toBe(10);
    expect(typeof props.pagination?.onPageChange).toBe("function");
    expect(typeof props.pagination?.onPerPageChange).toBe("function");
  });

  it("passes empty data array when response is undefined", () => {
    useCustomerStoreMock.mockReturnValue({
      customerSelected: { id: 1, customer_name: "Ana" },
    } as unknown as { customerSelected: Customer });

    useOrdersMock.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as { data: OrdersResponse | undefined; isLoading: boolean });

    render(<OrdersPageWithData />);

    const props = tableMock.mock.calls[0][0] as TableCapturedProps;
    expect(props.data).toEqual([]);
    expect(props.pagination).toBeUndefined();
  });

  it("onPerPageChange sets perPage and resets currentPage to 1", async () => {
    useCustomerStoreMock.mockReturnValue({
      customerSelected: { id: 1, customer_name: "Ana" },
    } as unknown as { customerSelected: Customer });

    // Da igual lo que devuelva, el objetivo aquí es verificar las llamadas
    useOrdersMock.mockReturnValue({
      data: { data: [], pagination: { current_page: 1, total_pages: 5 } },
      isLoading: false,
    } as unknown as { data: OrdersResponse; isLoading: boolean });

    render(<OrdersPageWithData />);

    // props del primer render
    const firstProps = tableMock.mock.calls[0][0] as TableCapturedProps;

    // dispara setState dentro de act
    act(() => {
      firstProps.pagination?.onPerPageChange(20);
    });

    // espera al re-render: useOrders debe ser llamado con perPage=20 y page=1
    await waitFor(() => {
      expect(useOrdersMock).toHaveBeenLastCalledWith(1, 1, 20);
    });

    // ahora simula cambio de página usando LAS PROPS MÁS RECIENTES
    const latestProps = tableMock.mock.calls[
      tableMock.mock.calls.length - 1
    ][0] as TableCapturedProps;

    act(() => {
      latestProps.pagination?.onPageChange(4);
    });

    await waitFor(() => {
      expect(useOrdersMock).toHaveBeenLastCalledWith(1, 4, 20);
    });
  });
});
