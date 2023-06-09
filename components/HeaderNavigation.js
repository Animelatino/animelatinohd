import React, { Component } from 'react';
import Link from 'next/link';
import Search from './Search';
import { menuItems } from '../helpers/Functions';

import styles from '../styles/HeaderNavigation.module.css';

export default class HeaderNavigation extends Component {
    constructor(props) {
        super(props);
    }

    menu = () => {
        return (
            <div className={styles.menu}>
                <Link href={'/'} className={`${styles.item} ${styles.logo}`}>
                    {process?.env?.NAME}
                </Link>
                {menuItems()?.map((item, i) => {
                    return (
                        <Link
                            key={i}
                            href={item?.link}
                            alt={item?.name}
                            className={styles.item}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className={styles.n}
                                dangerouslySetInnerHTML={{ __html: item?.icon }}
                            ></svg>
                            {item?.name}
                        </Link>
                    );
                })}
                <Search />
            </div>
        );
    };

    render() {
        return <div className={styles.container}>{this.menu()}</div>;
    }
}
