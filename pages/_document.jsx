import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#292929' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='theme-color' content='#ffffff' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
