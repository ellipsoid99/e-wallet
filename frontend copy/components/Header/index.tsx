import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import CustomSearchInput from "@/components/SearchInput";
import CustomDropdown from "@/components/Dropdown";
import CustomRightPanel from "@/components/RightPanel";
import SessionService from "@/services/Session";
import { userActions } from "@/actions";
import { UserIcon } from "@/svg";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Header = () => {
    // const userInfo = useSelector((state: any = {}) => state.users.items);
    const dispatch = useDispatch();
    const sessionObj: any = SessionService();
    const router = useRouter();
    const [dropdownOpen, dropdownOpenHandler] = useState(false);
    const [logoutUser, logoutUserHandler] = useState(false);
    const [menuList] = useState([
        {
            id: "profile",
            label: "Profile",
            disabled: false,
            fnCallback: () => {
                handleShow();
            },
        },
        {
            id: "logout",
            label: "Logout",
            disabled: false,
            fnCallback: () => {
                logoutHandler();
            },
        },
    ]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logoutHandler = () => {
        logoutUserHandler(!logoutUser);
    };
    const toggleDropdown = () => {
        dropdownOpenHandler(!dropdownOpen);
    };

    useEffect(() => {
        if (logoutUser) {
            signOut();
            logoutUserHandler(!logoutUser);
            dispatch(userActions.logoutUser(sessionObj));
        }
    }, [sessionObj, logoutUser, dispatch]);

    return (
        <div className={styles.header}>
            <div className="logo"></div>
            <div className={styles.rightSideHeader}>
                {/* <input type={"search"} /> */}
                <CustomSearchInput />
                <Button className="customButton">
                    <span className="icon icon-Apps" />
                </Button>
                <CustomDropdown
                    isOpenFn={dropdownOpen}
                    toggleFn={toggleDropdown}
                    CustomLabel={<UserIcon style={{ width: 35 }} />}
                    menuItems={menuList}
                />
            </div>
            <CustomRightPanel showState={show} onHideFn={handleClose} />
        </div>
    );
};

export default Header;
