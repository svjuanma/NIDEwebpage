
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nosotros from "../components/LandingPageComponents/Nosotros";
import Hero from "../components/LandingPageComponents/Hero";

function Landing(){
    const location = useLocation();

    useEffect(() => {
        const idFromHash = location.hash ? location.hash.replace("#", "") : null;
        const idFromState = (location.state as any)?.scrollTo as string | undefined;
        const id = idFromHash || idFromState;
        if (id) {
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
    }, [location]);

    return(
        <div>
            <Hero />

            <Nosotros
                id="nosotros"
                title="Nosotros"
                text={
                    'Somos un grupo de profesionistas comprometidos en el desarrollo integral de las infancias mexicanas.'
                }
                imgSrc="/src/assets/imagen_nosotros.jpg"
            />

            <Nosotros
                id="mision"
                title="Misión"
                text={`Desarrollar a la infancia y juventud mexicanas, a través de
                actividades que potencialicen las habilidades propias, brindando
                alternativas funcionales que permitan alcanzar un crecimiento
                académico y personal para incidir en la comunidad.`}
                imgSrc="/src/assets/imagen_2_nide.jpg"
            />

            <Nosotros
                id="vision"
                title="Visión"
                text={`Convertirnos en una institución referente en cuanto al
                desarrollo infantil en México, siendo partícipes en el
                desarrollo de cada niño que forma parte de nuestros
                programas.`}
                imgSrc="/src/assets/imagen_3_nide.png"
            />

            <Nosotros
                id="contacto"
                title="Contacto"
                text={<>
                    <a href="https://www.facebook.com/NIDE.FUNDACION">Contáctanos en Facebook</a>
                </>}
            />
        </div>
    );
}

export default Landing;