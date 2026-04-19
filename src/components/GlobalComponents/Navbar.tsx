import { useEffect, useRef, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import styles from "./navbar.module.css";

const CENTER_LINKS = [
    { id: "nosotros", label: "Nosotros" },
    { id: "mision", label: "Misión" },
    { id: "vision", label: "Visión" },
    { id: "contacto", label: "Contacto" },
];



function Navbar(): ReactElement {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);


    useEffect(() => {
        function onClick(e: MouseEvent) {
            const target = e.target as Node;
            if (
                open &&
                menuRef.current &&
                !menuRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setOpen(false);
            }
        }

        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

   

    return (
        <nav className={styles.navbar} aria-label="Main navigation">
            <div className={styles.container}>
                <Link className={styles.brand} to="/">
                    <img src="/src/assets/LOGO-NIDE.png" alt="NIDE logo" className={styles.logo} />
                    <span className={styles.brandText}>NIDE</span>
                </Link>

                <ul className={styles.centerLinksDesktop}>
                    {CENTER_LINKS.map((s) => (
                        <li key={s.id}>
                            <HashLink smooth to={`/#${s.id}`} className={styles.navLink} onClick={() => setOpen(false)}>
                                {s.label}
                            </HashLink>
                        </li>
                    ))}
                </ul>

                <button
                    ref={buttonRef}
                    className={styles.toggle}
                    aria-controls="primary-navigation"
                    aria-expanded={open}
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className={styles.hamburger} aria-hidden>
                        <span />
                        <span />
                        <span />
                    </span>
                </button>

                {/* Desktop login button */}
                <div className={styles.rightActions}>
                    <Link to="/login" className={styles.loginBtn}>
                        Iniciar sesión
                    </Link>
                </div>

                {/* mobile menu */}
                <ul
                    id="primary-navigation"
                    ref={menuRef}
                    className={open ? `${styles.navLinks} ${styles.open}` : styles.navLinks}
                >
                    {CENTER_LINKS.map((s) => (
                        <li key={`m-${s.id}`}>
                            <HashLink smooth to={`/#${s.id}`} className={styles.navLink} onClick={() => setOpen(false)}>
                                {s.label}
                            </HashLink>
                        </li>
                    ))}

                    <li>
                        <Link to="/login" className={styles.navLink} onClick={() => setOpen(false)}>
                            Iniciar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;