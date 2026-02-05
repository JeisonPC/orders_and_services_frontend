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
}

export const Table = <T,>({ 
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No hay datos para mostrar',
  onEdit, 
  onDelete,
  getRowKey,
}: TableProps<T>) => {
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

  return (
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
  );
};
