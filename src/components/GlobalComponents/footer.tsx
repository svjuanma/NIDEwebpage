import styles from './footer.module.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.left}>
          <img src="/src/assets/LOGO-NIDE.png" alt="NIDE" className={styles.logo} />
          <span>Fundación NIDE</span>
        </div>

        <div className={styles.right}>
          <small>© {year} Fundación NIDE</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
