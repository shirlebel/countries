import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      color: '#e57373',
      fontSize: '1.2rem'
    }}>
      {message}
    </div>
  );
};

