import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import AccountOverview from "./account-overview";
import FinanceOverview from "./finance-overview";
import PaymentOverview from "./payment-overview";
import "./style.scss";

const DashboardComponent = (props) => {
    const [accountData, setAccountData] = useState();
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const url = "/api/users/";
    const { user, accountnumber } = props;

    const getData = () => {
        axios
            .get(`${url}${accountnumber}`)
            .then((res) => {
                const accData = res.data.data;
                setAccountData(accData);
                setIsDataAvailable(true);
            })
            .catch((error) => console.error(`Errors: ${error}`));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container fluid className="layout">
            {isDataAvailable ? (
                <>
                    <Row>
                        <Col md={4}>
                            <AccountOverview data={accountData} />
                        </Col>
                        <Col md={8}>
                            <FinanceOverview data={accountData} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <PaymentOverview data={accountData} />
                        </Col>
                    </Row>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default DashboardComponent;
