import styles from './Table.module.css';
import { TableSkeleton } from './Table-skeleton';

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  getRowKey: (item: T) => string | number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    perPage: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
  };
}

export function Table<T = Record<string, unknown>>({ 
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No hay datos para mostrar',
  onEdit, 
  onDelete,
  getRowKey,
  pagination,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <TableSkeleton 
        columns={columns.length}
        showActions={!!(onEdit || onDelete)}
        columnLabels={columns.map(column => column.label)}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.empty}>
        {emptyMessage}
      </div>
    );
  }

  const showActions = onEdit || onDelete;

  const renderPagination = () => {
    if (!pagination) return null;

    const { currentPage, totalPages, perPage, onPageChange, onPerPageChange } = pagination;
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className={styles.pagination}>
        <div className={styles.paginationLeft}>
          <span className={styles.paginationLabel}>Mostrar</span>
          <select
            className={styles.paginationSelect}
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
          <span className={styles.paginationLabel}>por página</span>
        </div>

        <div className={styles.paginationCenter}>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          
          <div className={styles.paginationPages}>
            {pages.map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${
                  page === currentPage ? styles.paginationButtonActive : ''
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              {showActions && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={getRowKey(item)}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render 
                      ? column.render(item) 
                      : String((item as Record<string, unknown>)[column.key] ?? '')
                    }
                  </td>
                ))}
                {showActions && (
                  <td>
                    <div className={styles.actions}>
                      {onEdit && (
                        <button 
                          className={styles.actionButton}
                          onClick={() => onEdit(item)}
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          className={styles.actionButton}
                          onClick={() => onDelete(item)}
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
}

