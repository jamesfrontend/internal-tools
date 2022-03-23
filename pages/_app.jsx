import '../styles/globals.scss';
import Head from 'next/head';
import * as React from 'react';
import { MainHeader } from '../src/components/mainHeader';
import { useRouter } from 'next/dist/client/router';

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();

    const routes = [
        {
            label: 'Color Contrast',
            href: '/color-contrast',
            active: router.pathname === '/color-contrast',
        },
        {
            label: 'Typography Utility',
            href: '/typography',
            active: router.pathname === '/typography',
        },
    ];

    return (
        <>
            <Head>
                <title>Internal Tools</title>
                <link
                    href='https://fonts.googleapis.com/icon?family=Material+Icons+Sharp'
                    rel='stylesheet'
                />
                <link rel='manifest' href='site.webmanifest' />
                <meta name='description' content='Designer web tools' />
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
                <meta
                    name='title'
                    property='og:title'
                    content='Designer web tools'
                />
                <meta property='og:type' content='Website' />
                <meta
                    name='image'
                    property='og:image'
                    content='https://jamesfrontend.vercel.app/int-tool.jpg'
                />
                <meta
                    name='description'
                    property='og:description'
                    content='Designer web tools'
                />
                <meta name='author' content='James Nguyen' />
            </Head>
            <div className='msk-galaxy'>
                <div className='msk-world'>
                    <MainHeader data={routes} />
                    <Component {...pageProps} />
                </div>
                <footer></footer>
            </div>
        </>
    );
};

export default MyApp;
