import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className='overflow-x-hidden'>
            <Head />
            <body className='mt-10 md:mt-24'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}