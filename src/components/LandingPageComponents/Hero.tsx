import styles from "./hero.module.css"

const Hero = () => {
    return(
        <section id='hero' className={styles.heroSection}>
            <div className={styles.textContainer}>
                <h1>FUNDACIÓN <br /> NIDE</h1>
            </div>
        </section>
    );
}

export default Hero;