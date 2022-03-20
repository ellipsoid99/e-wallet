import { useRouter } from "next/router";

import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SessionService from "@/services/Session";
import { userActions, getUser } from "@/actions";

const Layout = (props: any) => {
    console.log("layout props", props);
    console.log("layout rendered");
    console.log("layout session", SessionService());
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any = {}) => state?.userInfo);
    const stateInfo = useSelector((state: any = {}) => state);
    const sessionObj: any = SessionService();
    const router = useRouter();

    const { children } = props;

    useEffect(() => {
        if (sessionObj && sessionObj.sessionStatus === "authenticated") {
            console.log("layout userInfo", userInfo);
            console.log("layout userInfo strin", JSON.stringify(userInfo));
            if (userInfo && Object.keys(userInfo).length === 0) {
                // dispatch(userActions.userInfo(sessionObj));
                dispatch(getUser(sessionObj));
            }
            if (router.asPath === "/") {
                router.push("/dashboard");
            }
        }
        if (sessionObj.sessionStatus === "unauthenticated") {
            if (router.asPath === "/login") {
                return;
            } else if (router.asPath === "/signup") {
                return;
            } else {
                router.push("/login");
            }
        }
        console.log("layout router", router);
    }, [dispatch, sessionObj, userInfo, router]);
    return <div>{children}</div>;
};

export default Layout;
