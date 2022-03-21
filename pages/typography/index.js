import { TypographyUtility } from '../../src/Typography';
import Head from 'next/head';
import { useState } from 'react';

const ButtonPage = () => {
    const [fontSet, setFontSet] = useState([]);

    const handleFonts = (item) => {
        const newArr = [];
        item.forEach((item) => {
            newArr.push(item.replace(' ', '+'));
        });
        setFontSet(newArr);
    };
    return (
        <>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                />
                {fontSet.map((item, key) => {
                    const renderLink = `https://fonts.googleapis.com/css2?family=${item}`;
                    return <link key={key} href={renderLink} rel='stylesheet' />;
                })}
            </Head>
            <TypographyUtility sendFonts={(e) => handleFonts(e)} />
        </>
    );
};

export default ButtonPage;
