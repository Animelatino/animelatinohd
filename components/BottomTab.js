import React from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { PopularIcon, HomeIcon, TrendingIcon, SearchIcon, ListIcon } from './Icons';
import ToggleTheme from './ToggleTheme';

export default function BottomTab() {
    const router = useRouter();
    return (
        <div className="bottomTab">
            <Link href="/">
                <a alt="Inicio" className={router.pathname == "/" ? "active" : ""}>
                    <HomeIcon /> Inicio
                </a>
            </Link>
            <Link href="/animes" activeClassName="active">
                <a alt="Lista de animes" className={router.pathname == "/animes" ? "active" : ""}>
                    <ListIcon /> Animes
                </a>
            </Link>
            <Link href="/topanimes" activeClassName="active">
                <a alt="Top Animes" className={router.pathname == "/topanimes" ? "active" : ""}>
                    <TrendingIcon /> Más vistos
                </a>
            </Link>
            <Link href="/search" activeClassName="active">
                <a alt="Search" className={router.pathname == "/search" ? "active" : ""}>
                    <SearchIcon /> Busqueda
                </a>
            </Link>
            <Link href="/popularanimes" activeClassName="active">
                <a alt="Populares" className={router.pathname == "/popularanimes" ? "active" : ""}>
                    <PopularIcon /> Populares
                </a>
            </Link>
            <ToggleTheme />
      </div>
    );
}