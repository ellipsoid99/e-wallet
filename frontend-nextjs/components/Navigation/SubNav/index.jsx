import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { setSessionStorage } from "../services/CacheService";
import styles from "../components/Navigation/LeftNav.module.scss";
import Link from "next/link";
const SubNav = (props) => {
  const { MenuObject } = props;
  const [mounted, setMounted] = useState(false);

  const [menuItemObj, setMenuItemObj] = useState(MenuObject);
  const router = useRouter();
  // console.log("SubNav", menuItemObj);
  // console.log("SubNav router", router);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div className={styles.subNav}>
        {menuItemObj && Object.keys(menuItemObj).length > 0 && (
          <div className={styles.subNavInner}>
            <h2>{menuItemObj.subtitle}</h2>
            <Nav vertical>
              {menuItemObj.menus &&
                menuItemObj.menus.length > 0 &&
                menuItemObj.menus.map((menuItem) => {
                  return (
                    <NavItem key={menuItem.id} className={styles.navItem}>
                      <Link href={menuItem.url}>
                        <a
                          className={`${styles.subNavLink} ${
                            menuItem.url === router.asPath ? styles.active : ""
                          }`}
                        >
                          {menuItem.title}
                        </a>
                      </Link>
                    </NavItem>
                  );
                })}
            </Nav>
          </div>
        )}
      </div>
    )
  );
};

export default SubNav;
