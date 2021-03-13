import React, { Component} from 'react';
import Modal from 'react-modal';

import styles from '../styles/Modal.module.css';

class DetectAdBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usingAdblock: false
        }
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            this.setState({ usingAdblock: this.fakeAdBanner.offsetHeight === 0});
        }
    }

    noticeContentJSX() {
        return (
            <Modal
                isOpen={true}
                style={{overlay: {zIndex: 1000}}}
                className={styles.modal}>
                    <div className={styles.message}>
                        <h2>¡ADBLOCK DETECTADO!</h2>
                        <div className={styles.contentMessage}>
                            <img src="https://i.imgur.com/cyL3MvS.png" height={180}/>
                            <div className={styles.info}>
                                <p>{process.env.NAME.toUpperCase()}  somos un sitio que gusta brindar un buen servicio por tanto no usamos publicidad, si se usa sera muy poca como banner que no afecten tu experiencia.</p>
                                <p>Por tanto te agradeceriamos muchos que desactivaras tu bloqueador de anuncios, asi podremos seguir brindandote un buen servicio.</p>
                            </div>
                        </div>
                    </div>
            </Modal>
        );
    }

    render() {
        if (this.state.usingAdblock === true) {
            return this.noticeContentJSX();
        }
        return (
            <div ref={r => (this.fakeAdBanner = r)} style={{ height: '1px', width: '1px', visiblity: 'none', pointerEvents: 'none' }} className="exo-native-widget"/>
        );
    }
}

export default DetectAdBlock;