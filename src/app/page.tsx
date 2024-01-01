import React from "react";
import { AppProps } from "next/app";
import Link from "next/link";
import styles from './Page.module.css'; 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.center}>
      

      <div className={styles.homeButtonContainer}>
        <Link href="/connection" passHref>
          <button type="button">Aller à la page de connexion</button>
        </Link>
      </div>
    </div>
  );
}
