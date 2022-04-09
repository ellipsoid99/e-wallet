import React, { useEffect } from "react";

import DataTable from "react-data-table-component";

const customStyles = {
    table: {
        style: {
            maxHeight: "500px",
        },
    },
    rows: {
        style: {
            maxHeight: "50px",
        },
    },
};
const columns = [
    {
        name: "From",
        selector: (row) => row.paymentFrom,
    },
    {
        name: "To",
        selector: (row) => row.paymentTo,
    },
    {
        name: "Amount",
        selector: (row) => row.amount + " INR",
    },
    {
        name: "Direction",
        selector: (row) => row.inOrOut,
    },
    {
        name: "Time",
        selector: (row) => row.timestamp,
    },
];
const data = [
    {
        id: 1,
        paymentFrom: "A",
        paymentTo: "B",
        amount: "100",
        inOrOut: "C",
        timestamp: "time1",
    },
    {
        id: 2,
        paymentFrom: "B",
        paymentTo: "A",
        amount: "100",
        inOrOut: "D",
        timestamp: "time2",
    },
    {
        id: 3,
        paymentFrom: "A",
        paymentTo: "C",
        amount: "200",
        inOrOut: "D",
        timestamp: "time3",
    },
];
const PaymentOverview = () => {
    return (
        <div className="outerWrapper">
            <div className="headerWrapper">PAYMENT SUMMARY</div>
            <div className="contentWrapper">
                <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
};
export default PaymentOverview;
