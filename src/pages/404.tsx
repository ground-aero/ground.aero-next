import { FC } from 'react';
import Link from 'next/link';

const Custom404: FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, но запрашиваемая страница не существует.</p>
      <Link href="/">
        <a>Вернуться на главную</a>
      </Link>
    </div>
  );
}

export default Custom404;