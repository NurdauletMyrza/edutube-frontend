import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// import {
//     Html,
//     Head,
//     Main,
//     NextScript,
//     DocumentProps,
//     DocumentContext,
// } from "next/document";
// import {
//     documentGetInitialProps,
//     DocumentHeadTags,
//     DocumentHeadTagsProps,
// } from "@mui/material-nextjs/v14-pagesRouter";
//
// const Document = (props: DocumentProps & DocumentHeadTagsProps) => {
//     return (
//         <Html lang={props.locale}>
//             <Head>
//                 {/*<link rel="icon" href="/favicon.ico" />*/}
//                 <DocumentHeadTags {...props} />
//             </Head>
//             <body>
//             <Main />
//             <NextScript />
//             </body>
//         </Html>
//     );
// };
//
// Document.getInitialProps = async (ctx: DocumentContext) => {
//     return await documentGetInitialProps(ctx);
// };
//
// export default Document;
