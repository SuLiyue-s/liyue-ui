import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import './Toast.css';

export interface ToastItem {
  id: string;
  content: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  duration?: number;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

export interface ToastProps {
  maxCount?: number;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  children?: React.ReactNode;
}

export interface ToastContextValue {
  toast: (content: React.ReactNode, options?: Partial<ToastItem>) => string;
  success: (content: React.ReactNode, options?: Partial<ToastItem>) => string;
  error: (content: React.ReactNode, options?: Partial<ToastItem>) => string;
  warning: (content: React.ReactNode, options?: Partial<ToastItem>) => string;
  info: (content: React.ReactNode, options?: Partial<ToastItem>) => string;
  loading: (content: React.ReactNode, options?: Partial<ToastItem>) => string;
  remove: (id: string) => void;
  destroy: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProps> = ({
  maxCount = 5,
  position = 'top',
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idCounter = useRef(0);

  const addToast = useCallback((content: React.ReactNode, options?: Partial<ToastItem>): string => {
    const id = `toast-${++idCounter.current}`;
    const toast: ToastItem = {
      id,
      content,
      type: 'info',
      duration: 3000,
      closable: true,
      ...options,
    };

    setToasts(prev => {
      const newToasts = [...prev, toast];
      if (maxCount && newToasts.length > maxCount) {
        return newToasts.slice(-maxCount);
      }
      return newToasts;
    });

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        remove(id);
      }, toast.duration);
    }

    return id;
  }, [maxCount]);

  const remove = useCallback((id: string) => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      toast?.onClose?.();
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const destroy = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback((content: React.ReactNode, options?: Partial<ToastItem>) => {
    return addToast(content, options);
  }, [addToast]);

  const success = useCallback((content: React.ReactNode, options?: Partial<ToastItem>) => {
    return addToast(content, { ...options, type: 'success' });
  }, [addToast]);

  const error = useCallback((content: React.ReactNode, options?: Partial<ToastItem>) => {
    return addToast(content, { ...options, type: 'error' });
  }, [addToast]);

  const warning = useCallback((content: React.ReactNode, options?: Partial<ToastItem>) => {
    return addToast(content, { ...options, type: 'warning' });
  }, [addToast]);

  const info = useCallback((content: React.ReactNode, options?: Partial<ToastItem>) => {
    return addToast(content, { ...options, type: 'info' });
  }, [addToast]);

  const loading = useCallback((content: React.ReactNode, options?: Partial<ToastItem>) => {
    return addToast(content, { ...options, type: 'loading' });
  }, [addToast]);

  const value = useMemo(() => ({
    toast,
    success,
    error,
    warning,
    info,
    loading,
    remove,
    destroy,
  }), [toast, success, error, warning, info, loading, remove, destroy]);

  const getIcon = (type?: string, icon?: React.ReactNode) => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case 'error':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case 'loading':
        return <div className="ly-toast__loading" />;
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={`ly-toast-container ly-toast-container--${position}`}>
        {toasts.map(item => (
          <div key={item.id} className={`ly-toast ly-toast--${item.type}`}>
            <span className="ly-toast__icon">{getIcon(item.type, item.icon)}</span>
            <span className="ly-toast__content">{item.content}</span>
            {item.closable && (
              <button className="ly-toast__close" onClick={() => remove(item.id)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
