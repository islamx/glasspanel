import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, loading, className = '', type = 'button', onClick }) => (
  <button
    type={type}
    className={`btn btn-primary d-flex align-items-center justify-content-center ${className}`}
    disabled={loading}
    onClick={onClick}
  >
    {loading && (
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    )}
    {children}
  </button>
);

export default Button; 