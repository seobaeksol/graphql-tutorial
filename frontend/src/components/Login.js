import React from "react";
import { setToken } from "../token";
import gql from "graphql-tag";
import { useMutation } from "urql";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = props => {
  const [isLoginPage, setIsLoginPage] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [state, executeMutation] = useMutation(
    isLoginPage ? LOGIN_MUTATION : SIGNUP_MUTATION
  );

  const mutate = React.useCallback(() => {
    executeMutation({ email, password, name }).then(({ data }) => {
      const token = data && data[isLoginPage ? "login" : "signup"].token;
      if (token) {
        setToken(token);
        props.history.push("/");
      }
    });
  }, [executeMutation, props.history, isLoginPage, email, password, name]);

  return (
    <div>
      <h4 className="mv3">{isLoginPage ? "Login" : "Sing Up"}</h4>
      <div className="flex flex-column">
        {!isLoginPage && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          type="button"
          className="pointer mr2 button"
          onClick={mutate}
          disabled={state.fetching}
        >
          {isLoginPage ? "login" : "create account"}
        </button>
        <button
          type="button"
          className="pointer button"
          onClick={() => setIsLoginPage(!isLoginPage)}
          disabled={state.fetching}
        >
          {isLoginPage
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
