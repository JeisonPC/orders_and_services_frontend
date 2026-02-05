import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, Column } from './Table';

interface TestData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
];

const mockColumns: Column<TestData>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { 
    key: 'status', 
    label: 'Estado',
    render: (item) => (
      <span className={item.status === 'active' ? 'active' : 'inactive'}>
        {item.status === 'active' ? 'Activo' : 'Inactivo'}
      </span>
    ),
  },
];

describe('Table Component', () => {
  describe('Rendering', () => {
    it('should render table with data', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
        />
      );

      // Check headers
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Estado')).toBeInTheDocument();

      // Check data rows
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('should render custom cell content with render function', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
        />
      );

      const activoElements = screen.getAllByText('Activo');
      const inactivoElements = screen.getAllByText('Inactivo');
      
      expect(activoElements).toHaveLength(2); // John and Bob
      expect(inactivoElements).toHaveLength(1); // Jane
    });

    it('should show loading skeleton when isLoading is true', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          isLoading={true}
        />
      );

      // Should show skeleton, not actual data
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should show empty message when no data', () => {
      render(
        <Table
          data={[]}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          emptyMessage="No hay registros"
        />
      );

      expect(screen.getByText('No hay registros')).toBeInTheDocument();
    });

    it('should use default empty message when not provided', () => {
      render(
        <Table
          data={[]}
          columns={mockColumns}
          getRowKey={(item) => item.id}
        />
      );

      expect(screen.getByText('No hay datos para mostrar')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should render action buttons when onEdit and onDelete are provided', () => {
      const mockEdit = jest.fn();
      const mockDelete = jest.fn();

      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          onEdit={mockEdit}
          onDelete={mockDelete}
        />
      );

      // Should have "Acciones" header
      expect(screen.getByText('Acciones')).toBeInTheDocument();

      // Should have action buttons for each row
      const editButtons = screen.getAllByText('Editar');
      const deleteButtons = screen.getAllByText('Eliminar');

      expect(editButtons).toHaveLength(mockData.length);
      expect(deleteButtons).toHaveLength(mockData.length);
    });

    it('should call onEdit with correct item when edit button is clicked', async () => {
      const user = userEvent.setup();
      const mockEdit = jest.fn();

      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          onEdit={mockEdit}
        />
      );

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);

      expect(mockEdit).toHaveBeenCalledTimes(1);
      expect(mockEdit).toHaveBeenCalledWith(mockData[0]);
    });

    it('should call onDelete with correct item when delete button is clicked', async () => {
      const user = userEvent.setup();
      const mockDelete = jest.fn();

      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          onDelete={mockDelete}
        />
      );

      const deleteButtons = screen.getAllByText('Eliminar');
      await user.click(deleteButtons[1]);

      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(mockDelete).toHaveBeenCalledWith(mockData[1]);
    });

    it('should not render actions column when no actions provided', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
        />
      );

      expect(screen.queryByText('Acciones')).not.toBeInTheDocument();
      expect(screen.queryByText('Editar')).not.toBeInTheDocument();
      expect(screen.queryByText('Eliminar')).not.toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    const mockPagination = {
      currentPage: 2,
      totalPages: 5,
      perPage: 10,
      onPageChange: jest.fn(),
      onPerPageChange: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render pagination controls when pagination prop is provided', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={mockPagination}
        />
      );

      expect(screen.getByText('Mostrar')).toBeInTheDocument();
      expect(screen.getByText('por página')).toBeInTheDocument();
      expect(screen.getByText('← Anterior')).toBeInTheDocument();
      expect(screen.getByText('Siguiente →')).toBeInTheDocument();
    });

    it('should render all page buttons', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={mockPagination}
        />
      );

      // Should have buttons for pages 1-5 in the pagination area
      const paginationButtons = screen.getAllByRole('button').filter(button => 
        ['1', '2', '3', '4', '5'].includes(button.textContent || '')
      );
      
      expect(paginationButtons).toHaveLength(5);
    });

    it('should disable "Anterior" button on first page', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={{ ...mockPagination, currentPage: 1 }}
        />
      );

      const previousButton = screen.getByText('← Anterior');
      expect(previousButton).toBeDisabled();
    });

    it('should disable "Siguiente" button on last page', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={{ ...mockPagination, currentPage: 5 }}
        />
      );

      const nextButton = screen.getByText('Siguiente →');
      expect(nextButton).toBeDisabled();
    });

    it('should call onPageChange when previous button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={mockPagination}
        />
      );

      const previousButton = screen.getByText('← Anterior');
      await user.click(previousButton);

      expect(mockPagination.onPageChange).toHaveBeenCalledTimes(1);
      expect(mockPagination.onPageChange).toHaveBeenCalledWith(1); // currentPage - 1
    });

    it('should call onPageChange when next button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={mockPagination}
        />
      );

      const nextButton = screen.getByText('Siguiente →');
      await user.click(nextButton);

      expect(mockPagination.onPageChange).toHaveBeenCalledTimes(1);
      expect(mockPagination.onPageChange).toHaveBeenCalledWith(3); // currentPage + 1
    });

    it('should call onPageChange when page number is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={mockPagination}
        />
      );

      const page4Button = screen.getByText('4');
      await user.click(page4Button);

      expect(mockPagination.onPageChange).toHaveBeenCalledTimes(1);
      expect(mockPagination.onPageChange).toHaveBeenCalledWith(4);
    });

    it('should call onPerPageChange when per page selector changes', async () => {
      const user = userEvent.setup();

      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={mockPagination}
        />
      );

      const select = screen.getByRole('combobox');
      await user.selectOptions(select, '20');

      expect(mockPagination.onPerPageChange).toHaveBeenCalledTimes(1);
      expect(mockPagination.onPerPageChange).toHaveBeenCalledWith(20);
    });

    it('should have correct per page options', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
          pagination={mockPagination}
        />
      );

      const select = screen.getByRole('combobox') as HTMLSelectElement;
      const options = Array.from(select.options).map(option => option.value);

      expect(options).toEqual(['5', '10', '20', '30', '40']);
    });

    it('should not render pagination when pagination prop is not provided', () => {
      render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
        />
      );

      expect(screen.queryByText('Mostrar')).not.toBeInTheDocument();
      expect(screen.queryByText('← Anterior')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined values in cells', () => {
      const dataWithNulls = [
        { id: 1, name: 'John', email: null as unknown as string, status: 'active' },
      ];

      render(
        <Table
          data={dataWithNulls}
          columns={mockColumns.filter(col => col.key !== 'status')}
          getRowKey={(item) => item.id}
        />
      );

      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('should apply correct key to each row', () => {
      const { container } = render(
        <Table
          data={mockData}
          columns={mockColumns}
          getRowKey={(item) => item.id}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(mockData.length);
    });
  });
});
