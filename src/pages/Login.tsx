import { signIn, useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
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
            <FaGithub size={'1.5rem'} /> | Login with GitHub
          </button>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageLogin}>
            <div className="bar bar_0"></div>
            <div className="bar bar_1"></div>
            <div className="bar bar_2"></div>
          </div>
          <p>Move-it</p>
        </div>
      </div>
    </>
  );
}
