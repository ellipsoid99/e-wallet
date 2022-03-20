import { Col, Container, Row } from "reactstrap";
import styles from "./Header.module.scss";
const DashboardHeader = () => {
    return (
        <div className={styles.dashboardHeader}>
            <Container fluid>
                <Row>
                    <Col>DashboardHeader</Col>
                </Row>
            </Container>
        </div>
    );
};

export default DashboardHeader;
