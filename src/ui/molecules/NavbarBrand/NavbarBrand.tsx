import Link from 'next/link';
import styles from './NavbarBrand.module.css';

interface NavbarBrandProps {
  title: string;
  href?: string;
}

export const NavbarBrand = ({ title, href = '/' }: NavbarBrandProps) => {
  return (
    <Link href={href} className={styles.brand}>
      <span className={styles.title}>{title}</span>
    </Link>
  );
};
