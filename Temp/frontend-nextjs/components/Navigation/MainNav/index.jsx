import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setSessionStorage,
  getSessionStorateValByKey,
} from "../services/CacheService";
import { menuActions } from "../actions";
import styles from "../components/Navigation/LeftNav.module.scss";

const MenuData = require("@/data/menu.json");

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const [menus, setMenus] = useState(MenuData);
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state) => state.userInfo);
  const stateInfo = useSelector((state) => state);
  console.log("userInfo in MainNav", userInfo);
  console.log("stateInfo in MainNav", stateInfo);
  useEffect(() => {
    const tempMenus = MenuData;
    if (tempMenus && tempMenus.length > 0) {
      tempMenus.forEach((menuItem) => {
        if (menuItem.menus && menuItem.menus.length > 0) {
          setSessionStorage("menuItem", menuItem);
        }
      });
    }
    setMenus(tempMenus);
  }, [menus, router]);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div className={styles.navHolder}>
        <Link href="/">
          <a className={styles.logo}>ct</a>
        </Link>
        <Nav vertical>
          {menus.map((menuItem) => {
            return (
              <NavItem key={menuItem.id} className={styles.navItem}>
                <Link href={menuItem.url}>
                  <a
                    className={`${styles.navLink} ${
                      menuItem.url === router.asPath ||
                      router.asPath.includes(menuItem.url.split("/")[1])
                        ? styles.active
                        : ""
                    }`}
                  >
                    {menuItem.intials}
                  </a>
                </Link>
              </NavItem>
            );
          })}
        </Nav>
      </div>
    )
  );
};

export default Navigation;
