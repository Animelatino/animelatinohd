import React from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { ListIcon, CloseIcon } from './Icons';
import { useRouter } from "next/router";

const ModalComponent = (props) => {
    const router = useRouter();

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function toogleModal(){
        setIsOpen(!modalIsOpen);
    } 

    function closeModal(){
        setIsOpen(false);
    } 

    return(
        <div>
            <a onClick={toogleModal}>
                <ListIcon /> Animes
            </a>
            <Modal
                ariaHideApp={false}
                className="Modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <div className="ModalClose" onClick={closeModal}>
                    <CloseIcon/>
                </div>
                <div className="ModalContent">
                    <Link href="/animes">
                        <a alt="Lista de animes" onClick={closeModal} className={router.pathname == "/animes" ? "active" : ""}> Directorio </a>
                    </Link>
                    <Link href="/animes/calendario">
                        <a alt="Calendario de animes" onClick={closeModal} className={router.pathname == "/animes/calendario" ? "active" : ""}> Calendario </a>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}

export default ModalComponent