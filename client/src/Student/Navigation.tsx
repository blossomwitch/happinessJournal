import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentProps, Token } from "../Tools/data.model";

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
        <div>
            <button onClick={onClickMenu}>Menu</button>
            <div style={{ display: menuVisible ? "block" : "none" }}>
                <Link to="/">Reflecions Form</Link><br/>
                <Link to="/ReflectionOverview">Reflecions Overview</Link><br/>
                <Link to="/" onClick={logoutButton}>Logout</Link>
            </div>
        </div>
    );
}

export default Navigation;