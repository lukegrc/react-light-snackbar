import React, { useEffect, useRef, useState, useCallback } from "react";
import { SnackbarProps } from "../types";

const SNACKBAR_STYLES = `
  :root {
    --snackbar-bg-default: #323232;
    --snackbar-bg-success: #4caf50;
    --snackbar-bg-error: #f44336;
    --snackbar-bg-warning: #ff9800;
    --snackbar-bg-info: #2196f3;
    --snackbar-color: #ffffff;
    --snackbar-action-color: #bb86fc;
    --snackbar-action-hover: #ffffff;
    --snackbar-close-hover: rgba(255, 255, 255, 0.1);
    --snackbar-close-focus: rgba(255, 255, 255, 0.2);
  }

  .snackbar {
    position: fixed;
    z-index: 9999;
    max-width: 400px;
    min-width: 300px;
    background: var(--snackbar-bg-default);
    color: var(--snackbar-color);
    border-radius: 4px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .snackbar--entering {
    transform: translateY(0);
    opacity: 1;
  }
  .snackbar--exiting {
    transform: translateY(100px);
    opacity: 0;
  }
  .snackbar--top-left {
    top: 24px;
    left: 24px;
    transform: translateY(-100px);
  }
  .snackbar--top-left.snackbar--entering {
    transform: translateY(0);
  }
  .snackbar--top-left.snackbar--exiting {
    transform: translateY(-100px);
  }
  .snackbar--top-center {
    top: 24px;
    left: 50%;
    transform: translate(-50%, -100px);
  }
  .snackbar--top-center.snackbar--entering {
    transform: translate(-50%, 0);
  }
  .snackbar--top-center.snackbar--exiting {
    transform: translate(-50%, -100px);
  }
  .snackbar--top-right {
    top: 24px;
    right: 24px;
    transform: translateY(-100px);
  }
  .snackbar--top-right.snackbar--entering {
    transform: translateY(0);
  }
  .snackbar--top-right.snackbar--exiting {
    transform: translateY(-100px);
  }
  .snackbar--bottom-left {
    bottom: 24px;
    left: 24px;
  }
  .snackbar--bottom-center {
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
  }
  .snackbar--bottom-center.snackbar--entering {
    transform: translate(-50%, 0);
  }
  .snackbar--bottom-center.snackbar--exiting {
    transform: translate(-50%, 100px);
  }
  .snackbar--bottom-right {
    bottom: 24px;
    right: 24px;
  }
  .snackbar--success {
    background: var(--snackbar-bg-success);
  }
  .snackbar--error {
    background: var(--snackbar-bg-error);
  }
  .snackbar--warning {
    background: var(--snackbar-bg-warning);
  }
  .snackbar--info {
    background: var(--snackbar-bg-info);
  }
  .snackbar__content {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    min-height: 48px;
  }
  .snackbar__message {
    flex: 1;
    margin-right: 8px;
  }
  .snackbar--entering .snackbar__message {
    opacity: 1;
  }
  .snackbar--exiting .snackbar__message {
    opacity: 0;
  }
  .snackbar__action {
    margin-right: 8px;
    color: var(--snackbar-action-color);
    cursor: pointer;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
    transition: color 0.2s ease;
  }
  .snackbar__action:hover {
    color: var(--snackbar-action-hover);
  }
  .snackbar__close {
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 20px;
    font-weight: 300;
    line-height: 1;
    padding: 0;
    margin: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }
  .snackbar__close:hover {
    background-color: var(--snackbar-close-hover);
  }
  .snackbar__close:focus {
    outline: none;
    background-color: var(--snackbar-close-focus);
  }
  @media (max-width: 600px) {
    .snackbar {
      min-width: 280px;
      max-width: calc(100vw - 48px);
      margin: 0 24px;
    }
    .snackbar--top-center,
    .snackbar--bottom-center {
      left: 24px;
      right: 24px;
      transform: none;
    }
    .snackbar--top-center.snackbar--entering,
    .snackbar--bottom-center.snackbar--entering {
      transform: none;
    }
    .snackbar--top-center.snackbar--exiting,
    .snackbar--bottom-center.snackbar--exiting {
      transform: none;
    }
  }
`;

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  variant = "default",
  position = "bottom-center",
  duration = 4000,
  autoHide = true,
  onClose,
  action,
  className = "",
  style = {},
  children,
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const animationRef = useRef<number>();

  const handleClose = useCallback(() => {
    setIsExiting(true);
    animationRef.current = requestAnimationFrame(() => {
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 150);
    });
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsExiting(false);

      if (autoHide && duration > 0) {
        timeoutRef.current = setTimeout(() => {
          handleClose();
        }, duration);
      }
    } else {
      handleClose();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [open, duration, autoHide, handleClose]);

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  if (!isVisible) return null;

  const positionClass = `snackbar--${position.replace("-", "-")}`;
  const variantClass = `snackbar--${variant}`;
  const exitClass = isExiting ? "snackbar--exiting" : "";

  return (
    <>
      <style>{SNACKBAR_STYLES}</style>
      <div
        className={`snackbar ${positionClass} ${variantClass} ${exitClass} ${className}`}
        style={style}
        role="alert"
        aria-live="polite"
      >
        <div className="snackbar__content">
          {children || <span className="snackbar__message">{message}</span>}
          {action && (
            <div className="snackbar__action" onClick={handleActionClick}>
              {action}
            </div>
          )}
          <button
            className="snackbar__close"
            onClick={handleClose}
            aria-label="Close notification"
            type="button"
          >
            ×
          </button>
        </div>
      </div>
    </>
  );
};
