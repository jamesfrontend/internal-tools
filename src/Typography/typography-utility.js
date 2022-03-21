import React, { useState } from 'react';
import { MultiSelect } from 'carbon-components-react';
import FontContainer from './FontContainer';
import FONTS from './google-fonts.json';

export const TypographyUtility = ({ sendFonts }) => {
    const DEFAULT_SENTENCE =
        'Memorial Sloan Kettering is a world leader in patient care, research, and educational programs.';
    const [fontSize, setFontSize] = useState(16);
    const [text, setText] = useState('');
    const [containers, setContainers] = useState([]);
    const handleReset = () => {
        setText('');
        setFontSize(16);
    };

    const handleSelect = (item) => {
        setContainers(item.selectedItems);
        sendFonts(item.selectedItems);
    };

    return (
        <main className='typography-wrapper'>
            <div className='toolbar'>
                <div>
                    <MultiSelect
                        light
                        titleText='Choose Fonts: '
                        items={FONTS}
                        label='Fonts'
                        id='id'
                        itemToString={(item) => (item ? item : '')}
                        onChange={(e) => handleSelect(e)}
                    />
                </div>
                <div>
                    <label htmlFor='sentence-input' className='bx--label'>
                        Sentence
                    </label>
                    <div className='sentence-input-wrapper'>
                        <input
                            id='sentence-input'
                            className='sentence-input'
                            type='text'
                            value={text}
                            placeholder='Type something'
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='range-input' className='bx--label'>
                        Font Size
                    </label>
                    <div className='range-input-wrapper'>
                        <input
                            id='range-input'
                            className='range-input'
                            type='range'
                            min={2}
                            max={100}
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                        />
                        <span className='size-export'>{fontSize}px</span>
                    </div>
                </div>
                <div className='reset-wrapper'>
                    <button
                        className='bx--btn bx--btn--primary bx--btn-icon-only'
                        onClick={handleReset}
                    >
                        <span className='material-icons-sharp'>
                            restart_alt
                        </span>
                    </button>
                </div>
            </div>

            {containers.length > 0 ? (
                <div className='grid' style={{ fontSize: `${fontSize}px` }}>
                    {containers.map((item, index) => (
                        <FontContainer
                            key={index}
                            font={item}
                            text={text.length === 0 ? DEFAULT_SENTENCE : text}
                            fontFamily={item}
                        />
                    ))}
                </div>
            ) : (
                <div className='empty-state'>
                    <h1>Choose fonts to compare</h1>
                </div>
            )}
        </main>
    );
};
