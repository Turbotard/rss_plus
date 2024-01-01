import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { run } from '../Backend/db';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await run();
    return { props: { connected: true } };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue s\'est produite';
    return { props: { error: errorMessage } };
  }
};

interface ConnectionDBPageProps {
  error?: string;
  connected?: boolean;
}

const ConnectionDBPage: React.FC<ConnectionDBPageProps> = ({ error, connected }) => {
  const router = useRouter();
  const [hasAttemptedReload, setHasAttemptedReload] = useState(false);

  useEffect(() => {
    if (connected) return;
    if ((error || !connected) && !hasAttemptedReload) {
      setHasAttemptedReload(true); 
      setTimeout(() => {
        router.reload();
      }, 1000); 
    }
  }, [error, connected, hasAttemptedReload, router]);

  if (error) {
    return <div>Erreur de connexion à la base de données: {error}</div>;
  }

  if (connected) {
    return (
      <div>
        <h1>Page de connexion à la base de données</h1>
        <p>La connexion à la base de données a été réussie.</p>
      </div>
    );
  }

  return <div>Connexion à la base de données en cours...</div>;
};

export default ConnectionDBPage;
