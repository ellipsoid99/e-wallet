import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./Auth.module.scss";
import Welcome from "components/welcome/Welcome";

const Login = () => {
    const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const errors = useSelector((state) => state.errors);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        accountnumber: "",
        password: "",
        errors: {},
    });
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    });

    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            accountnumber: state.accountnumber.trim(),
            password: state.password.trim(),
        };
        console.log("from onsubmit", userData);
        dispatch(loginUser(userData));
    };
    return (
        <Container fluid className={styles.base}>
            <Row className={styles.container}>
                <Col md={7}>
                    <Welcome />
                </Col>
                <Col md={5}>
                    <div className={styles.formContainer}>
                        <div className={styles.header}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register" className={styles.link}>
                                    Register
                                </Link>
                            </p>
                        </div>
                        <form
                            noValidate
                            onSubmit={onSubmit}
                            className={styles.form}
                        >
                            <div className={styles.inputGroup}>
                                <label htmlFor="accountnumber">
                                    Account Number
                                </label>
                                <input
                                    onChange={onChange}
                                    value={state.accountnumber}
                                    error={state.errors.accountnumber}
                                    id="accountnumber"
                                    type="text"
                                />

                                <span className={styles.error}>
                                    {errors.accountnumber}
                                    {errors.accountnumbernotfound}
                                </span>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={onChange}
                                    value={state.password}
                                    error={state.errors.password}
                                    id="password"
                                    type="password"
                                />
                                <span className={styles.error}>
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className={styles.buttonContainer}>
                                <button
                                    type="submit"
                                    className={styles.myButton}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
