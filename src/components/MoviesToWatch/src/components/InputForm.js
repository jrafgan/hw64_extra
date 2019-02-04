import React from 'react';

const InputForm = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
            <input id="item-name" placeholder="Movie name" onChange={event=>props.onChangeName(event)}/>
            <button id="add-btn" type="submit" onSubmit={props.onSubmit} >Add</button>
        </form>
    );
};

export default InputForm;