import styles from './SidebarMenu.module.css';

interface SidebarLink {
  label: string;
  href: string;
}

interface SidebarMenuProps {
  links: SidebarLink[];
  activeHref?: string;
}

export const SidebarMenu = ({ links, activeHref }: SidebarMenuProps) => {
  return (
    <div className={styles.section}>
      <ul className={styles.menu}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              className={`${styles.link} ${link.href === activeHref ? styles.active : ''}`}
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};