import React, { PureComponent } from 'react';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import Modal from 'react-modal';
import { withRouter } from 'next/router';

import styles from '../styles/Modal.module.css';

class MobileApp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };
    }

    componentDidMount = () => {
        this.setState({
            isOpen: true,
        });
    };

    salir = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { router } = this.props;

        const isCurrentPage = router.pathname === '/';

        if (!isCurrentPage) {
            return null;
        }

        const { isOpen } = this.state;
        return isMobile ? (
            <Modal
                ariaHideApp={false}
                isOpen={isOpen}
                style={{ overlay: { zIndex: 1000 } }}
                className={styles.modal}
            >
                <div className={`${styles.message} ${styles.app}`}>
                    <h2>Kawaii Animes APP</h2>
                    <div className={styles.contentMessage}>
                        <img
                            src="https://i.imgur.com/OQhrXzW.png"
                            height={180}
                        />
                        <div className={styles.info}>
                            <p>
                                Mire animes gratis sub español y doblados al
                                español latino en tu smartphone, tablet o tv!
                            </p>
                            <p>
                                <b>NOTA:</b> La primera vez que la abran deben
                                esperar unos 15 segundos, cerrar y volver a
                                abrir.
                            </p>
                            <div className={styles.buttons}>
                                <Link
                                    target={'_BLANK'}
                                    className={`${styles.button} ${styles.success}`}
                                    href="https://github.com/animelhd/kawaii-animes/raw/main/app-release.apk"
                                >
                                    Opcion 1
                                </Link>
                                <Link
                                    href="https://kawaiianimes.app/"
                                    target={'_BLANK'}
                                    className={`${styles.button} ${styles.infob}`}
                                >
                                    Opcion 2
                                </Link>
                                <Link
                                    href={''}
                                    onClick={() => this.salir()}
                                    className={`${styles.button} ${styles.danger}`}
                                >
                                    Salir
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        ) : null;
    }
}

export default withRouter(MobileApp);
