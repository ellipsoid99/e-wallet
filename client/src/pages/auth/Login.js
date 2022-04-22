import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./Auth.module.scss";
import Welcome from "components/welcome/Welcome";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            accountnumber: "",
            password: "",
            errors: {},
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            accountnumber: this.state.accountnumber,
            password: this.state.password,
        };

        this.props.loginUser(userData);
    };
    render() {
        const { errors } = this.state;
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
                                    <Link
                                        to="/register"
                                        className={styles.link}
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>
                            <form
                                noValidate
                                onSubmit={this.onSubmit}
                                className={styles.form}
                            >
                                <div className={styles.inputGroup}>
                                    <label htmlFor="accountnumber">
                                        Account Number
                                    </label>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.accountnumber}
                                        error={errors.accountnumber}
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
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
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
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
