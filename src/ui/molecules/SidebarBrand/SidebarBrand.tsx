import styles from './SidebarBrand.module.css';

interface SidebarBrandProps {
  tag: string;
  title: string;
  description: string;
}

export const SidebarBrand = ({ tag, title, description }: SidebarBrandProps) => {
  return (
    <div className={styles.brand}>
      <span className={styles.tag}>{tag}</span>
      <strong className={styles.title}>{title}</strong>
      <p className={styles.description}>{description}</p>
    </div>
  );
};