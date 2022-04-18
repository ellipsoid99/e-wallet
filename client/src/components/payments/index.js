import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PaymentProgress from "./PaymentProgress";
import PaymentForm from "./PaymentForm";
import "./style.scss";

const PaymentsComponent = () => {
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        amount: "",
        authKey: "",
    });
    const onSubmitHandler = (e) => {};
    return (
        <div className="wrapper">
            <div className="formContainer">
                <form>
                    <div className="header">
                        <h3>PAYMENT FORM</h3>
                    </div>
                    <div className="formBody">
                        <input
                            type="text"
                            name="Payment From"
                            placeholder="Who is making the payment..."
                            value={formData.from}
                        />
                        <input
                            type="text"
                            name="Payment To"
                            placeholder="To Whom the payment is made..."
                            value={formData.to}
                        />{" "}
                        <input
                            type="number"
                            name="Amount"
                            placeholder="Amount to be sent..."
                            value={formData.amount}
                        />
                        <div className="buttonWrapper">
                            <button>Pay Now</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="otherContainer">
                <PaymentProgress />
            </div>
        </div>
    );
};

export default PaymentsComponent;
