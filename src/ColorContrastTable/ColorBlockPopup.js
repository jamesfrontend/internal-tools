import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import CopyButton, { CopyButtonDropdown } from './CopyButton';
import PropTypes from 'prop-types';

const ColorBlockPopup = ({ combo, hex, label, tint, dataKey }) => {
    const [visible, setVisible] = useState(false);
    const aaaOptions = combo;
    const masterArray = dataKey;

    // create array that holds hex, scss, and figma tokens
    const mastKey = new Map();

    masterArray.forEach((item) => {
        mastKey.set(item.hex, {
            'figma-token': item.name.slice(1),
            'scss-token': item.name,
        });
    });

    // if there is no hex (aka empty object), we'll add the placeholder block
    if (hex === undefined) {
        return <div className={'msksb-color-block-empty'} />;
    }

    // Header object
    const HeaderObj = mastKey.get(hex);
    const headerArray = [
        {
            label: 'Figma token',
            token: HeaderObj['figma-token'],
        },
        {
            label: 'SCSS token',
            token: HeaderObj['scss-token'],
        },
        {
            label: 'Hex',
            token: hex,
        },
    ];

    return (
        <Tippy
            interactive
            theme='msk'
            placement='auto'
            visible={visible}
            onClickOutside={() => setVisible(false)}
            content={
                <div className='current-color-wrapper'>
                    <div className='current-color'>
                        {headerArray.map((item, index) => (
                            <div key={index} className='color-block-info'>
                                <div>
                                    {item.label}&#58;&#160;
                                    <span className='token-mono'>
                                        {item.token}
                                    </span>
                                </div>
                                <CopyButton
                                    tooltip={
                                        item.label === 'Hex'
                                            ? 'Copy hex value'
                                            : `Copy ${item.label}`
                                    }
                                    copyText={item.token}
                                />
                            </div>
                        ))}
                        <div className='two-blocks'>
                            <div
                                className='demo-block'
                                style={{ backgroundColor: hex }}
                            />
                            <div className={tint > 40 ? 'demo-block' : 'demo-block background-dark'} >
                                <h5
                                    className='msk--h5 text-shadow'
                                    style={{color: hex}}
                                >
                                    Abc
                                </h5>
                            </div>
                        </div>
                        {aaaOptions !== undefined && (
                            <div className='contrast-heading'>
                                AAA contrast with&#58;
                            </div>
                        )}
                    </div>
                    {aaaOptions !== undefined && (
                        <div className='contrast-wrapper'>
                            {aaaOptions.map((row, index) => {
                                const RowObj = mastKey.get(row.hex);
                                return (
                                    <div key={index} className='contrast-row'>
                                        <div className='flex-align-center'>
                                            <div
                                                className='contrast-block'
                                                style={{
                                                    backgroundColor: row.hex,
                                                }}
                                            />
                                            <span className='token-mono-400'>
                                                {RowObj['scss-token']}
                                            </span>
                                        </div>
                                        <CopyButtonDropdown
                                            scss={RowObj['scss-token']}
                                            figma={RowObj['figma-token']}
                                            hex={row.hex}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            }
        >
            <div
                onClick={() => setVisible(!visible)}
                className={'msksb-color-block'}
                style={{ backgroundColor: hex }}
            >
                <span
                    className='msksb-swatch-label msk--size-1'
                    style={
                        aaaOptions !== undefined
                            ? { color: aaaOptions[0].hex }
                            : {
                                  color: 'inherit',
                                  textShadow: '1px 1px 3px #ffffff',
                              }
                    }
                >
                    {label}
                </span>
            </div>
        </Tippy>
    );
};

ColorBlockPopup.propTypes = {
    /**
     * array of AAA colors
     */
    data: PropTypes.array,
    /**
     * key-value list of all hex and labels
     */
    dataKey: PropTypes.array.isRequired,
    /**
     * hex code of color
     */
    hex: PropTypes.node,
    /**
     * name of color
     */
    label: PropTypes.node,
    /**
     * tint value
     */
    tint: PropTypes.number,
};

export default ColorBlockPopup;
