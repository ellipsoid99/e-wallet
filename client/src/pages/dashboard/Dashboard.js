import { useSelector, useDispatch } from "react-redux";
import DashboardComponent from "components/dashboard";

const Dashboard = () => {
    const auth = useSelector((state) => state.auth);
    const accountnumber = localStorage.getItem("accountnumber");
    return (
        <div className="base">
            <DashboardComponent
                user={auth.user}
                accountnumber={accountnumber}
            />
        </div>
    );
};

export default Dashboard;
