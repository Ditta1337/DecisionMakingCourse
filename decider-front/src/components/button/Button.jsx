import React from "react"
import "./Button.scss"
import classNames from "classnames";

const Button = ({children, onClick, type="primary", active=true}) => {
    return (
        <button onClick={onClick} className={classNames("button", type, {"active": active})}>
            {children}
        </button>
    )
}

export default Button