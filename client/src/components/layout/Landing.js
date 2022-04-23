import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "./Layout.module.scss";
import Welcome from "components/welcome/Welcome";

const Landing = () => {
    return (
        <Container fluid className="gradientBase">
            <div className={styles.wrapper}>
                <div className={styles.gradientBase2}>
                    <Welcome />
                    <div className={styles.linksWrapper}>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Log In</Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Landing;
