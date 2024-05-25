import "../style/globel.css";
import buildClient from "../api/build-client";

const _app = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
};

_app.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return { ...data, pageProps };
};

export default _app;
