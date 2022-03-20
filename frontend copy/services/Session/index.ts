import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/actions";

const SessionService = () => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    const userInfo = useSelector((state: any = {}) => state);
    const router = useRouter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const tempSession: any = { ...session, sessionStatus: status };
    // console.log("tempSession", tempSession);
    // console.log("userInfo", userInfo);
    // useEffect(() => {
    //     if (
    //         tempSession.sessionStatus === "authenticated" &&
    //         tempSession?.user?.email &&
    //         tempSession?.accessToken &&
    //         !userInfo
    //     ) {
    //         dispatch(userActions.userInfo(tempSession));
    //     }
    //     if (
    //         tempSession &&
    //         tempSession.sessionStatus === "authenticated" &&
    //         userInfo &&
    //         router.asPath === "/login"
    //     ) {
    //         router.push("/user-management");
    //     }
    //     // if (!tempSession && tempSession.sessionStatus === "unauthenticated") {
    //     //     router.push("/login");
    //     // }
    // }, [tempSession, dispatch, userInfo, router]);
    return tempSession;
};

export default SessionService;
