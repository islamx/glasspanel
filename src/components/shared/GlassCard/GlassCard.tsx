import React from 'react';
import styles from './GlassCard.module.scss';

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`${styles.glassCard} ${className || ''}`}>{children}</div>
);

export default GlassCard; 