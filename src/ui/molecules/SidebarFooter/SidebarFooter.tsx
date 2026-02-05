import styles from './SidebarFooter.module.css';

interface SidebarFooterProps {
  message: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export const SidebarFooter = ({ message, buttonText, onButtonClick }: SidebarFooterProps) => {
  return (
    <div className={styles.footer}>
      <p className={styles.message}>{message}</p>
      <button type="button" className={styles.button} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};