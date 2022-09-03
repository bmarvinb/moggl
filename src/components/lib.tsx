/** @jsxRuntime classic */
/** @jsx jsx */

import styled from "@emotion/styled/macro";
import { jsx, keyframes } from "@emotion/react";
import { FaSpinner } from "react-icons/fa";
import { FC } from "react";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

export const FullPageSpinner = () => (
  <div
    css={{
      fontSize: "4em",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spinner />
  </div>
);

export const FullPageErrorFallback: FC<{ error: unknown }> = ({ error }) => (
  <div
    role="alert"
    css={{
      color: "red",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <p>There's a problem. Try refreshing the app.</p>
    <pre>{JSON.stringify(error)}</pre>
  </div>
);
