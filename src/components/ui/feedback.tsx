import React from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
}

export function Toast({ type, title, message, onClose }: ToastProps) {
  const styles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: '✅'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: '❌'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️'
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border rounded-lg p-4 shadow-lg max-w-md`}>
      <div className="flex items-start space-x-3">
        <div className="text-xl">{style.icon}</div>
        <div className="flex-1">
          <h4 className={`font-semibold ${style.text}`}>{title}</h4>
          <p className={`text-sm mt-1 ${style.text}`}>{message}</p>
        </div>
        <button 
          onClick={onClose}
          className={`${style.text} hover:opacity-70`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ type, title, children, className = '' }: AlertProps) {
  const styles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: '✅'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: '❌'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️'
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="text-xl">{style.icon}</div>
        <div className="flex-1">
          <h4 className={`font-semibold ${style.text} mb-1`}>{title}</h4>
          <div className={`${style.text}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function SuccessMessage({ message }: { message: string }) {
  return (
    <Alert type="success" title="Success!">
      <p>{message}</p>
    </Alert>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <Alert type="error" title="Error">
      <p>{message}</p>
    </Alert>
  );
}