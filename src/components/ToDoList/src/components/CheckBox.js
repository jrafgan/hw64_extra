import React from 'react';

const CheckBox = props => {
    return (
        <div className="checkBox">
            <input type="checkbox" onClick={(event)=>{props.check(event)}} />
        </div>
    )
};

export default CheckBox;