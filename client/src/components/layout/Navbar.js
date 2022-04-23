import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { SidebarData } from "./SidebarData";
import styles from "./Layout.module.scss";

const Navbar = (props) => {
    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
    };

    return (
        <>
            <nav className={styles.navMenu}>
                <div className={styles.linkWrapper}>
                    <ul className={styles.navMenuItems}>
                        <li className={styles.firstLink}>
                            <Link to="/">
                                <img
                                    src="http://localhost:3000/logo.png"
                                    alt="logo"
                                />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.path}>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={styles.buttonWrapper}>
                    <button
                        onClick={(e) => onLogoutClick(e)}
                        className="btn btn-large"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </>

        // <div className="navbar-fixed">
        //     <nav className="z-depth-0">
        //         <div className="nav-wrapper white">
        //             <Link
        //                 to="/"
        //                 style={{
        //                     fontFamily: "monospace",
        //                 }}
        //                 className="col s5 brand-logo center black-text"
        //             >
        //                 <i className="material-icons">code</i>
        //                 BANKABLE
        //             </Link>
        //             <div className="button-wrapper">
        //                 <button
        //                     onClick={(e) => onLogoutClick(e)}
        //                     className="btn btn-large"
        //                 >
        //                     Logout
        //                 </button>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
