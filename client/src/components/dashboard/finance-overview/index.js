import { Row, Col } from "react-bootstrap";
import styles from "../Dashboard.module.scss";

const FinanceOverview = (props) => {
    return (
        <div className={styles.outerWrapper}>
            <div className={styles.headerWrapper}>FINANCE SUMMARY</div>

            <Row className={styles.summary}>
                <Col md={6}>
                    <div className={styles.summaryItem}>
                        <h2 className={styles.Header}>Balance: </h2>
                        <h1 className={styles.Value}>
                            {props.data.balance} INR
                        </h1>
                    </div>
                    <div className={styles.summaryItem}>
                        <h2 className={styles.Header}>Deposites: </h2>
                        <h1 className={styles.Value}>100.00</h1>
                    </div>
                    <div className={styles.summaryItem}>
                        <h2 className={styles.Header}>Withdrawals: </h2>
                        <h1 className={styles.Value}>100.00</h1>
                    </div>
                </Col>
                <Col md={6}>
                    <div className={styles.summaryItem}>
                        <h2 className={styles.Header}>Balance: </h2>
                        <h1 className={styles.Value}>
                            {props.data.balance} INR
                        </h1>
                    </div>
                    <div className={styles.summaryItem}>
                        <h2 className={styles.Header}>Deposites: </h2>
                        <h1 className={styles.Value}>100.00</h1>
                    </div>
                    <div className={styles.summaryItem}>
                        <h2 className={styles.Header}>Withdrawals: </h2>
                        <h1 className={styles.Value}>100.00</h1>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default FinanceOverview;
