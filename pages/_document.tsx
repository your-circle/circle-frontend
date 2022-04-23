import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <title>Circle - Find Peers &#38; Mentors for projects</title>
        <meta name="description"content="Your Platform to find People and mentors for Projects and Hackathons. Filter projects and users to build your dream team and get to work."/>
        <meta name="og:title" property="og:title" content="Circle - Find Projects, Peers and Mentors" />
        <meta name="og:description" property="og:description" content="Your Platform to find People and mentors for Projects and Hackathons" />
        <meta property="og:site_name" content="Circle" />
        <meta property="og:url" content="https://your-circle.co/" />  
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Circle" />
        <meta name="twitter:image" content="" /> 
        <meta
          name="twitter:description"
          content="Your Platform to find People and mentors for Projects and Hackathons"
        />
        <meta name="twitter:site" content="https://your-circle.co/" />
        <meta property="og:type" content="website" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
