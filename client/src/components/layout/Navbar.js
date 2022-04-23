import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { SidebarData } from "./SidebarData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./Layout.module.scss";

const Navbar = () => {
    const dispatch = useDispatch();
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
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={styles.buttonWrapper}>
                    <button onClick={() => dispatch(logoutUser())}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
