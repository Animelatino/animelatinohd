import React from "react";
import Image from 'next/image';

const NotFound = ({type}) => {
    return (
        <main className="NotFoundPage">
            <Image src="https://i.imgur.com/rohVDPu.png" width="400" height="400" alt="Not found" />
            <h3>El { type } que estás buscando no se encuentra o</h3>
            <h3>puede haber sido eliminado.</h3>
        </main>
    );
};
  
  export default NotFound;