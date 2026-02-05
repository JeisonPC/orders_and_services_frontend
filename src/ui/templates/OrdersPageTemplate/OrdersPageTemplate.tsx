import { ReactNode } from 'react';
import styles from './OrdersPageTemplate.module.css';

interface OrdersPageTemplateProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const OrdersPageTemplate = ({ 
  title = 'Pedidos',
  actions,
  children 
}: OrdersPageTemplateProps) => {
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
