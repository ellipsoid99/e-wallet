import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PaymentsComponent from "components/payments";

class Payments extends Component {
    render() {
        const { user } = this.props.auth;

        return (
            <div className="container valign-wrapper">
                <PaymentsComponent user={user} />
            </div>
        );
    }
}

Payments.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Payments);
