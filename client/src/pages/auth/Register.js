import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { registerUser } from "../../actions/authActions";
import Welcome from "components/welcome/Welcome";
import styles from "./Auth.module.scss";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            phoneNumber: "",
            password: "",
            password2: "",
            errors: {},
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
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

        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registerUser(newUser, this.props.history);
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
                                onSubmit={this.onSubmit}
                                className={styles.form}
                            >
                                <div className={styles.inputGroup}>
                                    <label htmlFor="firstname">
                                        First Name
                                    </label>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.firstname}
                                        error={errors.firstname}
                                        id="firstname"
                                        type="text"
                                    />
                                    <span className={styles.error}>
                                        {errors.name}
                                    </span>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="lastname">Last Name</label>

                                    <input
                                        onChange={this.onChange}
                                        value={this.state.lastname}
                                        error={errors.lastname}
                                        id="lastname"
                                        type="text"
                                    />
                                    <span className={styles.error}>
                                        {errors.name}
                                    </span>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="phoneNumber">
                                        Phone Number
                                    </label>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.phoneNumber}
                                        error={errors.phoneNumber}
                                        id="phoneNumber"
                                        type="text"
                                    />

                                    <span className={styles.error}>
                                        {errors.email}
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
                                    </span>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="password2">
                                        Confirm Password
                                    </label>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        id="password2"
                                        type="password"
                                    />

                                    <span className={styles.error}>
                                        {errors.password2}
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
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
