import { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import { registerUser } from "../../actions/authActions";
import Welcome from "components/welcome/Welcome";
import styles from "./Auth.module.scss";

const Register = () => {
    const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        phoneNumber: "",
        password: "",
        password2: "",
        errors: {},
    });
    const [modalShow, setModalShow] = useState(false);
    const [accountnumber, setAccountnumber] = useState("");
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }, []);
    useEffect(() => {
        setModalShow(true);
    }, [success]);
    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            firstname: state.firstname,
            lastname: state.lastname,
            phoneNumber: state.phoneNumber,
            password: state.password,
            password2: state.password2,
        };
        dispatch(
            registerUser(newUser, (result) => {
                setAccountnumber(result);
                setSuccess(true);
            })
        );
    };
    const MyModal = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                centered
                contentClassName={styles.modalContent}
                className={styles.modal}
            >
                <Modal.Header className={styles.modalHeader}>
                    <Modal.Title className={styles.modalTitle}>
                        Registration Acknowledgement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <h4>
                        Please note your Account Number, you won't be able to
                        retrive it later!!
                    </h4>
                    <p>{accountnumber}</p>
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button
                        className={styles.modalButton}
                        onClick={props.onHide}
                    >
                        Go To Login
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };
    return (
        <Container fluid className={styles.base}>
            {success ? (
                <>
                    {console.log("inside onsubmit", accountnumber)}
                    <MyModal
                        show={modalShow}
                        onHide={() => history.push("/login")}
                    />
                </>
            ) : (
                <Row className={styles.container}>
                    <Col md={7}>
                        <Welcome />
                    </Col>
                    <Col md={5}>
                        <div className={styles.formContainer}>
                            <div className={styles.header}>
                                <h4>
                                    <b>Register</b> below
                                </h4>
                                <p>
                                    Already have an account?{" "}
                                    <Link to="/login" className={styles.link}>
                                        Log in
                                    </Link>
                                </p>
                            </div>
                            <form
                                noValidate
                                onSubmit={onSubmit}
                                className={styles.form}
                            >
                                <div className={styles.inputGroup}>
                                    <label htmlFor="firstname">
                                        First Name
                                    </label>
                                    <input
                                        onChange={onChange}
                                        value={state.firstname}
                                        error={state.errors.firstname}
                                        id="firstname"
                                        type="text"
                                    />
                                    <span className={styles.error}>
                                        {state.errors.name}
                                    </span>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="lastname">Last Name</label>

                                    <input
                                        onChange={onChange}
                                        value={state.lastname}
                                        error={state.errors.lastname}
                                        id="lastname"
                                        type="text"
                                    />
                                    <span className={styles.error}>
                                        {state.errors.name}
                                    </span>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="phoneNumber">
                                        Phone Number
                                    </label>
                                    <input
                                        onChange={onChange}
                                        value={state.phoneNumber}
                                        error={state.errors.phoneNumber}
                                        id="phoneNumber"
                                        type="text"
                                    />

                                    <span className={styles.error}>
                                        {state.errors.email}
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
                                        {state.errors.password}
                                    </span>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="password2">
                                        Confirm Password
                                    </label>
                                    <input
                                        onChange={onChange}
                                        value={state.password2}
                                        error={state.errors.password2}
                                        id="password2"
                                        type="password"
                                    />

                                    <span className={styles.error}>
                                        {state.errors.password2}
                                    </span>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <button
                                        type="submit"
                                        className={styles.myButton}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default withRouter(Register);
