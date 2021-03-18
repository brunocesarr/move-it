import { signIn, useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import styles from './styles/Login/Login.module.css';

export default function Login(): JSX.Element {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/Login');
    } else {
      router.push('/');
    }
  }, [session, loading]);

  return (
    <>
      <Head>
        <title>Login | Move.It</title>
      </Head>
      <div className={styles.loginContainer}>
        <div>
          <button
            type="button"
            className={styles.githubButton}
            onClick={() => signIn('github')}
          >
            Github Login
          </button>
        </div>
        <div>Image</div>
      </div>
    </>
  );
}
