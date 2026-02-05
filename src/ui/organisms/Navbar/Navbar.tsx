import { NavbarBrand } from '@/ui/molecules/NavbarBrand/NavbarBrand';
import { NavbarActions } from '@/ui/molecules/NavbarActions/NavbarActions';
import styles from './Navbar.module.css';

interface NavbarProps {
  brand?: {
    title: string;
    href?: string;
  };
  children?: React.ReactNode;
}

export const Navbar = ({ brand, children }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {brand && <NavbarBrand title={brand.title} href={brand.href} />}
        
        <NavbarActions>
          {children}
        </NavbarActions>
      </div>
    </nav>
  );
};
