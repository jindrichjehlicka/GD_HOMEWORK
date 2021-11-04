import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

const ProtectedLinks: React.FC = () => {
    return (
        <>
            <NavLink to={"/dashboard"} className={styles.Link} activeClassName={styles.LinkActive} exact>
                Dashboard
            </NavLink>

        </>
    );
};

export default ProtectedLinks;
