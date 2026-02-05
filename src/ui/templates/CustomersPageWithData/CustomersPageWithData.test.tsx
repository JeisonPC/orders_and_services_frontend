import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomersPageWithData } from "./CustomersPageWithData";

import { useCustomers } from "@/features/customers/hooks/useCustomers";

// Mock del hook
jest.mock("@/features/customers/hooks/useCustomers", () => ({
  useCustomers: jest.fn(),
}));

// Mock de columns (no necesitamos su implementación real)
jest.mock("@/features/customers/config/customersTableColumns", () => ({
  customersTableColumns: [{ key: "id", label: "ID" }],
}));

// Mock de PageLayout para poder assert del título y children
jest.mock("@/ui/organisms/PageLayout", () => ({
  PageLayout: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section>
      <h1>{title}</h1>
      <div data-testid="layout-children">{children}</div>
    </section>
  ),
}));

// Mock de Table para capturar props y poder validarlas
const tableMock = jest.fn(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ isLoading }: any) => (
    <div data-testid="table">{isLoading ? "loading" : "ready"}</div>
  ),
);

jest.mock("@/ui/organisms/Table", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Table: (props: any) => tableMock(props),
}));

type Customer = { id: number; customer_name?: string };

describe("CustomersPageWithData", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useCustomersMock = useCustomers as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page title inside PageLayout", () => {
    useCustomersMock.mockReturnValue({
      data: [],
      isLoading: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<CustomersPageWithData />);

    expect(
      screen.getByRole("heading", { name: "Clientes" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("layout-children")).toBeInTheDocument();
  });

  it("passes customers data and loading state to Table", () => {
    const customers: Customer[] = [
      { id: 1, customer_name: "Ana" },
      { id: 2, customer_name: "Luis" },
    ];

    useCustomersMock.mockReturnValue({
      data: customers,
      isLoading: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<CustomersPageWithData />);

    // Render del Table mock
    expect(screen.getByTestId('table')).toHaveTextContent('loading');

    // Validar props pasadas a Table
    expect(tableMock).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = tableMock.mock.calls[0][0] as any;

    expect(props.isLoading).toBe(true);
    expect(props.data).toEqual(customers);
    expect(props.columns).toEqual([{ key: "id", label: "ID" }]);

    // getRowKey debe devolver el id
    expect(typeof props.getRowKey).toBe("function");
    expect(props.getRowKey(customers[0])).toBe(1);
  });

  it("uses empty array when customers is undefined", () => {
    useCustomersMock.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useCustomers>);

    render(<CustomersPageWithData />);

    expect(tableMock).toHaveBeenCalledTimes(1);
    const props = tableMock.mock.calls[0][0];

    expect(props.data).toEqual([]);
    expect(screen.getByTestId("table")).toHaveTextContent("ready");
  });
});
