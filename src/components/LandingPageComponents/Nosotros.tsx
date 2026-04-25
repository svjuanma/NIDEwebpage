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