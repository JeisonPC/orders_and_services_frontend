import React from 'react';
import skeletonStyles from './Table-skeleton.module.css';
import styles from './Table.module.css';

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showActions?: boolean;
  columnLabels?: string[];
}

export const TableSkeleton = ({ 
  columns, 
  rows = 5, 
  showActions = false,
  columnLabels = []
}: TableSkeletonProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columnLabels.length > 0 ? (
            columnLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))
          ) : (
            Array.from({ length: columns }).map((_, index) => (
              <th key={index}>&nbsp;</th>
            ))
          )}
          {showActions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} style={{ '--row-index': rowIndex } as React.CSSProperties}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex}>
                <span className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonRow}`} />
              </td>
            ))}
            {showActions && (
              <td>
                <span className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonRow}`} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};