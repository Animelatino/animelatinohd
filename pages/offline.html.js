import React, { Component } from 'react';
import Head from 'next/head';

import styles from '../styles/Offline.module.css';

export default class componentName extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Sin Conexion a Internet</title>
                </Head>
                <main className={styles.container}>
                    <h1>Esta es la página de respaldo sin conexión</h1>
                    <h2>Cuando esté desconectado, cualquier ruta recurrirá a esta página.</h2>
                </main>
            </div>
        );
    }
}
