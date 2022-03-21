import ColorBlockPopup from './ColorBlockPopup';
import React from 'react';
import data from '../data/msk-colors.json';

const ColorContrastTable = () => {
    // create copy of data (for performance)
    const copyData = data;
    const order = [
        'blue',
        'white',
        'black',
        'gray',
        'cool-gray',
        'warm-gray',
        'teal',
        'magenta',
        'orange',
        'purple',
        'red',
        'yellow',
        'green',
        'cyan',
    ];

    // Create array of tint tints 0-100, increments of 10
    const ROW_NUMBERS = Array.from({ length: 11 }, (init, index) => index * 10);

    const HEADER_DATA = [
        {
            heading: 'Primary',
            colSpan: 1,
        },
        {
            heading: 'B + W',
            colSpan: 2,
        },
        {
            heading: 'Gray',
            colSpan: 3,
        },
        {
            heading: 'Secondary',
            colSpan: 4,
        },
        {
            heading: 'Status',
            colSpan: 4,
        },
    ];

    // Create array of subheadings by adding $token-- to the order array
    const SUBHEADING_DATA = [];
    const add = '$token--';
    order.forEach((item) => SUBHEADING_DATA.push(add.concat('', item)));

    // Prep data for parsing
    const finishedData = [];

    copyData.map((item) => {
        const doubleDashIndex = item.name.indexOf('--');
        const singleDashIndex = item.name.lastIndexOf('-');
        const getName = item.name.slice(doubleDashIndex + 2, singleDashIndex);

        const getTint = parseInt(
            item.name.slice(item.name.lastIndexOf('-') + 1)
        );

        if (item.combinations.length !== 0) {
            return finishedData.push({
                name: item.name,
                tint: getTint,
                color: getName,
                hex: item.hex,
                combo: item.combinations.map((item) => {
                    return { hex: item.hex };
                }),
            });
        } else
            return finishedData.push({
                name: item.name,
                tint: getTint,
                color: getName,
                hex: item.hex,
            });
    });

    // Add empty objects that have tint tint for color but no hex and sorts it by tint tint
    const termsArray = [];
    SUBHEADING_DATA.forEach((item) => termsArray.push(item.concat('-')));

    // Create array with all possibilities
    const possibleArray = [];
    ROW_NUMBERS.map((item) => {
        termsArray.map((term) => {
            const newStuff = term + item.toString();
            const doubleDashIndex = newStuff.indexOf('--');
            const singleDashIndex = newStuff.lastIndexOf('-');
            const getName = newStuff.slice(
                doubleDashIndex + 2,
                singleDashIndex
            );
            return possibleArray.push({
                name: newStuff,
                tint: item,
                color: getName,
            });
        });
    });

    // Add missing tint objects in finishedData array
    possibleArray.map((item) => {
        const check = finishedData.findIndex((x) => x.name === item.name);
        if (check === -1) {
            finishedData.push({
                name: item.name,
                tint: item.tint,
                color: item.color,
            });
        }
    });

    // sort by finishedData array by color name then by tint tint
    finishedData.sort((a, b) => {
        return a.color.localeCompare(b.color) || a.tint - b.tint;
    });

    // parse row objects by tint tint
    function ParseRow(count) {
        const filtered = [];
        const sorted = [];
        finishedData.filter((item) => {
            if (count === item.tint) {
                filtered.push(item);
            }
        });

        order.map((match) => {
            filtered.map((tint) => {
                if (tint.color === match) {
                    return sorted.push(tint);
                }
            });
        });
        return sorted;
    }

    return (
        <>
            <div className={'msksb-table-wrapper'}>
                <table className="msksb-table">
                    <thead className="msksb-table--thead">
                        <tr>
                            <th />
                            {HEADER_DATA.map((item, index) => (
                                <th key={index} colSpan={item.colSpan}>
                                    <div className="msksb-heading-cell">
                                        <h3 className="msksb-heading">
                                            {item.heading}
                                        </h3>
                                    </div>
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th />
                            {SUBHEADING_DATA.map((item, index) => (
                                <th key={index}>
                                    <div className={'msksb-subheading-cell'}>
                                        <span className="msksb-subheading">
                                            {item}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={'msksb-tbody'}>
                        {ROW_NUMBERS.map((number, index) => (
                            <tr key={index}>
                                <th>
                                    <div className={'msksb-row-heading'}>
                                        <h5 className="msk--h5 msksb-row-text">
                                            {number}
                                        </h5>
                                    </div>
                                </th>
                                {ParseRow(number).map((item, index) => (
                                    <td
                                        key={index}
                                        className={
                                            index + 1 === 1
                                                ? `msksb-row-data-${index + 1}`
                                                : 'msksb-row-data'
                                        }
                                    >
                                        <ColorBlockPopup
                                            dataKey={data}
                                            combo={item.combo}
                                            hex={item.hex}
                                            label={item.name}
                                            tint={item.tint}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ColorContrastTable;
