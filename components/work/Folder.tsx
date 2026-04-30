import { cn } from "@/lib/utils";
import styles from "./Folder.module.css";

interface FolderProps {
  open: boolean;
  onClick: () => void;
}

export function Folder({ open, onClick }: FolderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="work-list"
      aria-label={open ? "Close project folder" : "Open project folder to reveal projects"}
      className={cn(styles.folder, open && styles.open)}
    >
      <div className={styles.back}>
        <div className={cn(styles.paper, styles.paper1)} />
        <div className={cn(styles.paper, styles.paper2)} />
        <div className={cn(styles.paper, styles.paper3)} />
        <div className={styles.front} />
        <div className={cn(styles.front, styles.right)} />
      </div>
    </button>
  );
}
