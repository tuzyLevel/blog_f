import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

// export const getInitialProps = async (ctx: DocumentContext) => {
//   const sheet = new ServerStyleSheet();
//   const originalRenderPage = ctx.renderPage;

//   try {
//     ctx.renderPage = () =>
//       originalRenderPage({
//         enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
//       });

//     const initialProps = await Document.getInitialProps(ctx);
//     return {
//       ...initialProps,
//       styles: (
//         <>
//           {initialProps.styles}
//           {sheet.getStyleElement()}
//         </>
//       ),
//     };
//   } finally {
//     sheet.seal();
//   }
// };

export default function _Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="portal_root" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// import Document, {
//   DocumentContext,
//   Head,
//   Html,
//   Main,
//   NextScript,
// } from "next/document";
// import { ServerStyleSheet } from "styled-components";

// export default class _Document extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const sheet = new ServerStyleSheet();
//     const originalRenderPage = ctx.renderPage;

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />),
//         });

//       const initialProps = await Document.getInitialProps(ctx);
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         ),
//       };
//     } finally {
//       sheet.seal();
//     }
//   }

//   render() {
//     return (
//       <Html>
//         <Head>
//           <meta name="theme-color" content="#000000" />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }
