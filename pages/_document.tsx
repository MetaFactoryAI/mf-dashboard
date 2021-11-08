import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            href="https://uploads-ssl.webflow.com/6026543af66b1305fa436c0d/603691e91912788138ae9e47_MF-FAVICON-32.gif"
            rel="shortcut icon"
            type="image/x-icon"
          />
          <link
            href="https://uploads-ssl.webflow.com/6026543af66b1305fa436c0d/60369258d2d2b4eb12e73592_webclip.svg"
            rel="apple-touch-icon"
          />
        </Head>
        <body className="page">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
