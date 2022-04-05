import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import useSWR from "swr";
import SessionService from "@/services/Session";
import Layout from "@/components/Dashboard/Layout";
import CustomRightPanel from "@/components/RightPanel";
import Roles from "@/components/Dashboard/AccessMatrix/Roles";
import Loader from "@/components/Loader";
import { getSessionStorateValByKey } from "@/services/CacheService";
import { Button } from "reactstrap";
const AccessMatrix = () => {
    const menuItem = getSessionStorateValByKey("menuItem");
    console.log("read menuItem  from session", menuItem);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const AccessMatrixContent = () => {
        return (
            <div className="contentArea">
                AccessMatrixContent goes here!
                <Button onClick={handleShow}>Create New Role</Button>
                <CustomRightPanel
                    heading={"Create New Role"}
                    showState={show}
                    onHideFn={handleClose}
                    ChildComponent={<Roles />}
                />
            </div>
        );
    };

    // useEffect(() => {}, [session, router]);
    return (
        <div>
            <Layout
                Section={AccessMatrixContent}
                SubMenu={
                    menuItem && menuItem.menus && menuItem.menus.length > 0
                        ? menuItem
                        : {}
                }
            />
        </div>
    );
};

export default AccessMatrix;
