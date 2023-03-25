import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation } from "react-router-dom";
import { utilList } from "./list";
import "./header.scss";

export function Header() {
    const location = useLocation();
    const utilInfo = utilList[location.pathname.slice(1)];
    return (
        <>
            <header id="main-header">
                <Link to="/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <FontAwesomeIcon icon={utilInfo.icon} />
                <h1>
                    {utilInfo.name}
                </h1>
            </header>
            <Outlet />
        </>
    )
}