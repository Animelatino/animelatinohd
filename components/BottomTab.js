import React from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { PopularIcon, HomeIcon, TrendingIcon, SearchIcon } from './Icons';
import ToggleTheme from './ToggleTheme';

export default function BottomTab() {
    const router = useRouter();
    return (
        <div className="bottomTab">
            <Link href="/">
                <a alt="Inicio" className={router.pathname == "/" ? "active" : ""}>
                    <HomeIcon />
                </a>
            </Link>
            <Link href="/topanimes" activeClassName="active">
                <a alt="Top Animes" className={router.pathname == "/topanimes" ? "active" : ""}>
                    <TrendingIcon />
                </a>
            </Link>
            <Link href="/search" activeClassName="active">
                <a alt="Search" className={router.pathname == "/search" ? "active" : ""}>
                    <SearchIcon />
                </a>
            </Link>
            <Link href="/popularanimes" activeClassName="active">
                <a alt="Populares" className={router.pathname == "/popularanimes" ? "active" : ""}>
                    <PopularIcon />
                </a>
            </Link>
            <ToggleTheme />
      </div>
    );
}