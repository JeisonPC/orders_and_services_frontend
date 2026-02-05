import { SidebarBrand } from "@/ui/molecules/SidebarBrand/SidebarBrand";
import { SidebarMenu } from "@/ui/molecules/SidebarMenu/SidebarMenu";
import { SidebarFooter } from "@/ui/molecules/SidebarFooter/SidebarFooter";
import styles from './Sidebar.module.css';

interface SidebarLink {
  label: string;
  href: string;
}

interface SidebarProps {
  links: SidebarLink[];
  activeHref?: string;
  onCreateOrder?: () => void;
}

export const Sidebar = ({ links, activeHref, onCreateOrder }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <SidebarBrand
        tag="RoR"
        title="Órdenes & Servicios"
        description="Tablero operativo para monitorear clientes estratégicos."
      />

      <SidebarMenu links={links} activeHref={activeHref} />

      <SidebarFooter
        message="¿Aún no eres cliente?"
        buttonText="Registrarme"
        onButtonClick={onCreateOrder}
      />
    </aside>
  );
};
