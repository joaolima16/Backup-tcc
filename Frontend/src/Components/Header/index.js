import "./styleHeader.css"
import * as React from "react";

import { FaBars } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

import Sidebar from "../Sidebar";

import Senai from '../../assets/senai.png'
import Sair from '../../assets/sair.svg'



export default function Header(){
    const [sidebar, setSidebar] = React.useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return(
        <>
            <header>
                <div className="header-content-left">
                    <FaBars size={25} id="menu-button" onClick={showSidebar}/>
                    <img id="senai-logo" src={Senai} alt="" />
                </div>
                <div>
                    <button id="button-exit">
                        <BiLogIn size={30} />
                    </button>
                </div>
            </header>
            <div>
                {sidebar && <Sidebar active={setSidebar}/>}
            </div>
        </>
    );
}