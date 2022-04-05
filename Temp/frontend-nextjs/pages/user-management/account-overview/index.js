import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import useSWR from "swr";
import SessionService from "@/services/Session";
import Layout from "@/components/Dashboard/Layout";
import AccountInfo from "@/components/Dashboard/AccountOverview";
import Loader from "@/components/Loader";
import { getSessionStorateValByKey } from "@/services/CacheService";
const AccountOverview = () => {
    const menuItem = getSessionStorateValByKey("menuItem");
    console.log("read menuItem  from session", menuItem);
    const AccountOverviewContent = () => {
        return (
            <div className="contentArea">
                <AccountInfo UserDetails={"asd"} />
            </div>
        );
    };

    // useEffect(() => {}, [session, router]);
    return (
        <div>
            <Layout
                Section={AccountOverviewContent}
                SubMenu={
                    menuItem && menuItem.menus && menuItem.menus.length > 0
                        ? menuItem
                        : {}
                }
            />
        </div>
    );
};

export default AccountOverview;
