// components/FormattedText.tsx
import React from 'react';
import styles from '../app/FormattedText.module.css';

interface FormattedTextProps {
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const formatText = (input: string) => {
    return input.split('\n').map((line, index) => {
      // Заменяем ***текст*** на <strong><em>текст</em></strong> для жирного курсива
      let formattedLine = line.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
      
      // Заменяем **текст** на <strong>текст</strong> для жирного шрифта
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Заменяем *текст* на <em>текст</em> для обычного курсива
      formattedLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      return (
        <React.Fragment key={index}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {index < input.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return <pre className={styles.formattedText}>{formatText(text)}</pre>;
};

export default FormattedText;