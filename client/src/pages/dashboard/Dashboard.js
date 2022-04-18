import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardComponent from "components/dashboard";

class Dashboard extends Component {
    render() {
        const { user } = this.props.auth;
        const accountnumber = localStorage.getItem("accountnumber");
        return (
            <div className="container valign-wrapper">
                <DashboardComponent user={user} accountnumber={accountnumber} />
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
