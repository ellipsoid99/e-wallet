import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardComponent from "components/dashboard";

class Dashboard extends Component {
    render() {
        const { user } = this.props.auth;
        const accountnumber = localStorage.getItem("accountnumber");
        return (
            <div className="base">
                <DashboardComponent user={user} accountnumber={accountnumber} />
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
