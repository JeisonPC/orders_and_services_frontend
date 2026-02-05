import { Button } from '@/ui/atoms/Button/Button';
import styles from './NavbarActions.module.css';

interface NavbarActionsProps {
  children?: React.ReactNode;
}

export const NavbarActions = ({ children }: NavbarActionsProps) => {
  return (
    <div className={styles.actions}>
      {children}
    </div>
  );
};
