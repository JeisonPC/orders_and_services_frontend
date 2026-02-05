import { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({ 
  title = 'Pedidos',
  actions,
  children 
}: PageLayoutProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
