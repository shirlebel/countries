import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles['error-message']}>
      {message}
    </div>
  );
};
