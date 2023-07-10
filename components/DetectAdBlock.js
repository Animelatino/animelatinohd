import React from 'react';
import { useDetectAdBlock } from 'adblock-detect-react';

import Modal from 'react-modal';

import styles from '../styles/Modal.module.css';

const DetectAdBlock = () => {
    const adBlockDetected = useDetectAdBlock();

    React.useEffect(() => {
        if (adBlockDetected) {
            window.alert('Bloqueador de anuncios detectado');
        }
    }, []);

    return (
        <div>
            {adBlockDetected && (
                <Modal
                    isOpen={true}
                    style={{ overlay: { zIndex: 1000 } }}
                    className={styles.modal}
                >
                    <div className={styles.message}>
                        <h2>¡ADBLOCK DETECTADO!</h2>
                        <div className={styles.contentMessage}>
                            <img
                                src="https://i.imgur.com/cyL3MvS.png"
                                height={180}
                            />
                            <div className={styles.info}>
                                <p>
                                    {process.env.NAME.toUpperCase()} - Somos un
                                    sitio que brinda un buen servicio de
                                    streaming por tanto no usamos publicidad
                                    invasiva, que afecten su experiencia en el
                                    sitio.
                                </p>
                                <p>
                                    Por tanto te agradeceriamos muchos que
                                    desactivaras tu bloqueador de anuncios, asi
                                    podremos seguir brindandote un buen
                                    servicio.
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DetectAdBlock;
