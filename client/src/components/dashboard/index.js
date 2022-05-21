import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import AccountOverview from "./account-overview";
import FinanceOverview from "./finance-overview";
import PaymentOverview from "./payment-overview";
import styles from "./Dashboard.module.scss";

const DashboardComponent = (props) => {
    const [accountData, setAccountData] = useState();
    const [isDataAvailable, setIsDataAvailable] = useState(false);

    useEffect(() => {
        const { accountnumber } = props;
        const url = "/api/users/";
        const getData = () => {
            axios
                .get(`${url}${accountnumber}`)
                .then((res) => {
                    const accData = res.data.data[0];
                    console.log("data", accData);
                    setAccountData(accData);
                    setIsDataAvailable(true);
                })
                .catch((error) => console.error(`Errors: ${error}`));
        };
        getData();
    }, [props]);

    return (
        <Container fluid className="base">
            {isDataAvailable ? (
                <>
                    <div className={styles.row}>
                        <div className={styles.column1}>
                            <AccountOverview data={accountData} />
                        </div>
                        <div className={styles.column2}>
                            <FinanceOverview data={accountData.transaction} />
                        </div>
                    </div>
                    <div className={styles.tableRow}>
                        <PaymentOverview data={accountData.transaction} />
                    </div>
                </>
            ) : (
                <>LOADING...</>
            )}
        </Container>
    );
};

export default DashboardComponent;
