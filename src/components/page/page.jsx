import React from 'react';

import Header from '../header/header';
import Navigation from '../navigation/navigation';

import useAuthentication from '../../shared/hooks/use-authentication';

import styles from './page.module.css';

function Page({ children }) {
  const { isLoggedIn } = useAuthentication();
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles['main-content']}>{children}</main>
    </div>
  );
}

export default Page;
