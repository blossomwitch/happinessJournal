import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentProps, Token } from "../Tools/data.model";
import "./Navigation.scss";

import { AiOutlineMenu } from "react-icons/ai";

const Navigation = ({ setToken }: ComponentProps) => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const onClickMenu = (e:any):void => {
        menuVisible === false 
        ?
        setMenuVisible(true)
        :
        setMenuVisible(false)
    };

    const logoutButton = (e: any): void => {
        const token: Token = {
          token: "",
        };
        setToken(token);
      };

    return(
        <div className="header">
            <header className="header-area header-area nav-fixed nav-fade">
                <div className="nav">
                    <span className="nav-logo">Happiness Journal</span>
                    <AiOutlineMenu className="nav-toggler" onClick={onClickMenu}/>
                    <div className="nav-menu" style={{ display: menuVisible ? "block" : "none"}}>
                        <div className="nav-item">
                            <Link to="/" className="nav-link">Reflections Form</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/ReflectionOverview" className="nav-link">Reflections Overview</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/" className="nav-link" onClick={logoutButton}>Logout</Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Navigation;