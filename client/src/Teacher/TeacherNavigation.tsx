import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentProps, Token } from "../Tools/data.model";
import "./TeacherNavigation.scss";

import { AiOutlineMenu } from "react-icons/ai";

const TeacherNavigation = ({ setToken }: ComponentProps) => {
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
        sessionStorage.setItem("email", "");
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
                            <Link to="/" className="nav-link" onClick={onClickMenu}>Student Reflections</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/studentList" className="nav-link" onClick={onClickMenu}>Student List</Link>
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

export default TeacherNavigation;