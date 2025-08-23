import { ReactNode } from "react";

export type SnackbarPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type SnackbarVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface SnackbarOptions {
  id?: string;
  message: string;
  variant?: SnackbarVariant;
  position?: SnackbarPosition;
  duration?: number;
  autoHide?: boolean;
  onClose?: (() => void) | undefined;
  action?: ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export interface SnackbarProps extends SnackbarOptions {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export interface SnackbarContextValue {
  showSnackbar: (options: SnackbarOptions) => string;
  hideSnackbar: (id: string) => void;
  hideAllSnackbars: () => void;
}
