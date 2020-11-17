import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useEffect, useState } from 'react';
import netlifyAuth from '@components/NetlifyAuth';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyAuth.initialize((loggedInUser) => {
      setLoggedIn(!!loggedInUser);
    });
  }, [loggedIn]);

  const login = () => {
    netlifyAuth.authenticate((loggedInUser) => {
      setLoggedIn(!!loggedInUser);
      setUser(loggedInUser);
      netlifyAuth.closeModal();
    });
  };

  const logout = () => {
    netlifyAuth.signout(() => {
      setLoggedIn(false);
      setUser(null);
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing
          <code>pages/index.js</code>
        </p>
        <div>
          {loggedIn ? (
            <div>
              You are logged in!!!
              {user && <>Welcome {user.user_metadata.full_name}!</>}
              <br />
              <button type="button" onClick={logout}>
                Log out here.
              </button>
            </div>
          ) : (
            <button type="button" onClick={login}>
              Log in here.
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
