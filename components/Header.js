import React from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { FaAlignRight } from 'react-icons/fa';
import styles from '../styles/Header.module.css';

export default function Header() {
    const router = useRouter();
    const [active, setActive] = React.useState(false);

    const itemsMenu = [
        {
            link: "/",
            name: "Inicio"
        },
        {
            link: "/animes",
            name:"Directorio"
        },
        {
            link: "/animes/calendario",
            name:"Calendario"
        }
    ];
    
    const onToogleMenu = () => {
        setActive(!active)
    }


    const Menu = () => {
        return (
            <>
                <ul className={active ? `${styles.nav} ${styles.showNav}` : styles.nav }>
                    {itemsMenu.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link href={item.link}>
                                    <a alt={item.name} className={router.pathname === item.link ? styles.active : null }>{item.name}</a>
                                </Link>
                            </li>
                        )})
                    }
                    <Search/>
                </ul>
            </>
        )
    }

    const ButtonOpenClose = () => {
        return (
            <div className={styles.ButtonMenu} onClick={onToogleMenu}>
                <FaAlignRight/>
            </div>
        )
    }

    const Logo = () => {
        return (
            <Link href={'/'}>
                <a className={styles.Logo}>{process?.env?.SITENAME}</a>
            </Link>
        )
    }

    const Search = () => {
        return (
            <form action="/animes" className={styles.search}>
                <input id="search-n" placeholder="Buscar..." name="search"/>
                <label htmlFor="search-n">Buscar</label>
            </form>
        )
    }
    
    return (
        <div className={styles.navBar}>
            <Logo/>
            <ButtonOpenClose/>
            <Menu/>
        </div>
    );
    
}