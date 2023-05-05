import styles from '../styles/ErrorPage.module.css';

export default function Error404() {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src="https://i.imgur.com/ezDId0D.jpg"
                />
            </div>
            <div className={styles.messageContainer}>
                <h1 className={styles.messageTitle}>
                    No pudimos encontrar lo que estas buscando
                </h1>
                <span className={styles.messageDescription}>
                    Si crees que esto es un error, no dudes en ponerte en
                    contacto con nosotros y haremos todo lo posible para
                    ayudarte.
                </span>
            </div>
            <div className={styles.buttonsContainer}>
                <a href="/">
                    <button type="button" className={styles.button}>
                        Regresar al inicio
                    </button>
                </a>
            </div>
        </div>
    );
}
