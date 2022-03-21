import React from 'react';

const FontContainer = ({ font = 'Font name', text, fontFamily }) => {

    return (
        <div className='font-container' style={{ fontFamily: fontFamily }}>
            <h4>{font}</h4>
            <p style={{ wordBreak: 'break-word' }}>{text}</p>
        </div>
    );
};

export default FontContainer;
