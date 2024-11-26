// Notifications.types.ts
export type Severity = "success" | "error" | "info" | "warning";

export interface NotificationsProps {
  message: string | null;
  severity: Severity;
  onClose: () => void;
}
