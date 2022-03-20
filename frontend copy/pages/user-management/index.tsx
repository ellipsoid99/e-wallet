import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import useSWR from "swr";
import SessionService from "@/services/Session";
import Layout from "@/components/Dashboard/Layout";
const UserManagement = () => {
    // SessionService();
    // const router = useRouter();
    const UserManagementContent = () => {
        return <div>user management Page is here!</div>;
    };

    // useEffect(() => {}, [session, router]);
    return (
        <div>
            <Layout Section={UserManagementContent} />
        </div>
    );
};

export default UserManagement;
