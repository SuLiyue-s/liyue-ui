import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { Icon } from '../Icon';
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

  const getIcon = (type?: string, icon?: React.ReactNode): React.ReactNode => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return <Icon type="check-circle" size={20} />;
      case 'error':
        return <Icon type="close-circle" size={20} />;
      case 'warning':
        return <Icon type="warning" size={20} />;
      case 'loading':
        return <Icon type="loading" size={20} className="ly-toast__loading" />;
      default:
        return <Icon type="info-circle" size={20} />;
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
                <Icon type="close" size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
