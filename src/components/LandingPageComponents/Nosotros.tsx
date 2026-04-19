import styles from './nosotros.module.css';
import type { ReactNode } from 'react';

interface SectionProps {
    id?: string;
    title: string;
    text?: string | ReactNode;
    imgSrc?: string;
    imgAlt?: string;
    className?: string;
}

/**
 * Reusable content section used for Nosotros, Misión, Visión, etc.
 * - Renders a heading, optional text (string or node) and optional image.
 * - Keeps the same markup/classes as the original Nosotros component so styles work.
 */
const Nosotros = ({ id, title, text, imgSrc, imgAlt, className }: SectionProps) => {
    return (
        <section id={id} className={`${styles.nosotrosSection} ${className ?? ''}`}>
            <div className={styles.textContainer}>
                <h2>{title}</h2>
                {typeof text === 'string' ? <p>{text}</p> : text}
            </div>

            {imgSrc ? (
                <img className={styles.imagen} src={imgSrc} alt={imgAlt ?? title} />
            ) : null}
        </section>
    );
};

export default Nosotros;