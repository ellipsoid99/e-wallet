import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import SessionService from "@/services/Session";
import Layout from "@/components/Dashboard/Layout";
const Dashboard = (props: any) => {
    console.log("props", props);
    // console.log("pathname", pathname);
    // console.log("search", search);
    // console.log("hash", hash);
    // const sessionObj = SessionService();
    // const router = useRouter();
    // SessionService();
    const DashboardContent = () => {
        return <div>Dashboard Page is here!</div>;
    };

    // useEffect(() => {}, [sessionObj, router]);
    return (
        <div>
            <Layout Section={DashboardContent} />
        </div>
    );
};
const mapStateToProps = (state: any) => ({
    // console.log('state', state);
    state: state,
    // pathname: state.router.location.pathname,
    // search: state.router.location.search,
    // hash: state.router.location.hash,
});

export default connect(mapStateToProps)(Dashboard);
