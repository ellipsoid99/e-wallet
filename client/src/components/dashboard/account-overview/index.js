import React, { useEffect } from "react";

const AccountOverview = (props) => {
    //  Date Time
    const locale = "en";
    const [today, setDate] = React.useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const day = today.toLocaleDateString(locale, { weekday: "long" });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(
        locale,
        { month: "long" }
    )}\n\n`;
    const time = today.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: true,
        minute: "numeric",
        second: "numeric",
    });

    return (
        <>
            <div className="outerWrapper">
                <div className="headingWrapper">
                    <h3 className="date">{date}</h3>
                    <h3 className="time">{time}</h3>
                </div>
                <div className="bodyWrapper">
                    <div className="imageWrapper">
                        <img src="https://via.placeholder.com/100" />
                    </div>
                    <div className="textWrapper">
                        <h5>Welcome</h5>
                        <h3>
                            {props.data[0].firstname} {props.data[0].lastname}
                        </h3>
                        <h4>{props.data[0].accountnumber} </h4>
                        <p className="message">Hope you're doing well!!</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountOverview;
