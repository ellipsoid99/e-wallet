import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SidebarData } from "./SidebarData";
import "./style.scss";

const Navbar = (props) => {
    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
    };

    return (
        <>
            <nav className="nav-menu">
                <div className="link-wrapper">
                    <ul className="nav-menu-items">
                        <li className="first-link">
                            <Link to="/">
                                <span className="bankable">
                                    {" "}
                                    <i className="material-icons">code</i>
                                    BANKABLE
                                </span>
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className="nav-text">
                                    <Link to={item.path}>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="button-wrapper">
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
