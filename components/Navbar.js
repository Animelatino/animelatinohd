import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import ToggleTheme from './ToggleTheme';

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="navbar">
            <div className="container">
                <Link href="/">
                    <a>
                        <span className="logo">AnimeLHD</span>
                    </a>
                </Link>
                <form action="/search">
                    <input id="search-n" placeholder="Buscar..." name="q"/>
                </form>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                <a alt="Inicio" className={router.pathname == "/" ? "nav-active" : ""}>Inicio</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/topanimes">
                                <a alt="Top Animes" className={router.pathname == "/topanimes" ? "nav-active" : ""}>Más vistos</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/popularanimes">
                                <a alt="Populares" className={router.pathname == "/popularanimes" ? "nav-active" : ""}>Populares</a>
                            </Link>
                        </li>
                        <li>
                            <ToggleTheme />
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}