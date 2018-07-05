import React from 'react';

const validationComponent = (props) => {
    let validationText = (props.txtLen < 5 ? "Text too short" : "Text long enough");

    return (
        <p>{validationText}</p>
    );
}

export default validationComponent;