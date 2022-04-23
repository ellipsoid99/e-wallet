import { useSelector } from "react-redux";
import PaymentsComponent from "components/payments";

const Payments = () => {
    const auth = useSelector((state) => state.auth);
    return <PaymentsComponent user={auth.user} />;
};

export default Payments;
