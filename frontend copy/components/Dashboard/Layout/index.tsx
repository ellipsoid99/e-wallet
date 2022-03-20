import LeftNav from "@/components/Navigation/MainNav";
import SubNav from "@/components/Navigation/SubNav";
import Header from "@/components/Header";
import DashboardHeader from "@/components/Dashboard/Header";
import styles from "./Layout.module.scss";
// import axios from "axios";
// import useSWR from "swr";
// import { useEffect } from "react";

const Layout = (props: any) => {
    const { Section, SubMenu } = props;

    return (
        <div className={styles.wrapper}>
            <LeftNav />
            <div className={styles.mainSection}>
                <Header />
                <div className="section">
                    <SubNav MenuObject={SubMenu} />
                    <div className="innerSection">
                        <DashboardHeader />
                        <Section />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
