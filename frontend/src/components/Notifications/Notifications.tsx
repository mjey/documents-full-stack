// Notifications.tsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { NotificationsProps } from "./Notifications.types";

const Notifications: React.FC<NotificationsProps> = ({
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar open={Boolean(message)} autoHideDuration={4000} onClose={onClose}>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
