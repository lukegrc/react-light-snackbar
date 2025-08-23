import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Snackbar } from "./Snackbar";
import {
  SnackbarContextValue,
  SnackbarOptions,
  SnackbarPosition,
  SnackbarVariant,
} from "../types";

const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined
);

interface SnackbarItem extends SnackbarOptions {
  id: string;
  open: boolean;
}

interface SnackbarProviderProps {
  children: ReactNode;
  maxSnackbars?: number;
  defaultPosition?: SnackbarPosition;
  defaultDuration?: number;
  defaultVariant?: SnackbarVariant;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  maxSnackbars = 3,
  defaultPosition = "bottom-center",
  defaultDuration = 4000,
  defaultVariant = "default",
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const showSnackbar = useCallback(
    (options: SnackbarOptions): string => {
      const id =
        options.id ||
        `snackbar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const newSnackbar: SnackbarItem = {
        id,
        open: true,
        position: (options.position || defaultPosition) as SnackbarPosition,
        duration: options.duration ?? defaultDuration,
        variant: (options.variant || defaultVariant) as SnackbarVariant,
        autoHide: options.autoHide ?? true,
        message: options.message,
        action: options.action,
        className: options.className,
        style: options.style,
        onClose: options.onClose || undefined,
      };

      setSnackbars((prev: SnackbarItem[]) => {
        const updated = [...prev, newSnackbar];
        return updated.slice(-maxSnackbars);
      });

      return id;
    },
    [defaultPosition, defaultDuration, defaultVariant, maxSnackbars]
  );

  const hideSnackbar = useCallback((id: string) => {
    setSnackbars((prev: SnackbarItem[]) =>
      prev.map((snackbar: SnackbarItem) =>
        snackbar.id === id ? { ...snackbar, open: false } : snackbar
      )
    );
  }, []);

  const hideAllSnackbars = useCallback(() => {
    setSnackbars((prev: SnackbarItem[]) =>
      prev.map((snackbar: SnackbarItem) => ({ ...snackbar, open: false }))
    );
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev: SnackbarItem[]) =>
      prev.filter((snackbar: SnackbarItem) => snackbar.id !== id)
    );
  }, []);

  const contextValue: SnackbarContextValue = {
    showSnackbar,
    hideSnackbar,
    hideAllSnackbars,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          open={snackbar.open}
          message={snackbar.message}
          variant={snackbar.variant || "default"}
          position={snackbar.position || "bottom-center"}
          duration={snackbar.duration || 4000}
          autoHide={snackbar.autoHide ?? true}
          action={snackbar.action}
          className={snackbar.className}
          style={snackbar.style}
          onClose={() => {
            snackbar.onClose?.();
            removeSnackbar(snackbar.id);
          }}
        />
      ))}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
