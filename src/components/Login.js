import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, loginWithGoogle,loginWithFacebook } = useAuth();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      console.log("Algo ha fallado al iniciar sesión");
      setError("Algo ha fallado al iniciar sesión");
    }
    setLoading(false);
  }

  var LoginGoogle = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      history.push("/");
    } catch {
      setError("Algo ha fallado al iniciar sesión con Google");
    }
    setLoading(false);
  };
  async function LoginFacebook() {
    try {
      setError("");
      setLoading(true);
      await loginWithFacebook();
      history.push("/");
    } catch {
      setError("Algo ha fallado al iniciar sesión con Facebook");
    }
    setLoading(false);
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              id="btnMail"
              disabled={Loading}
              className="btn-warning mt-2 w-100"
              type="submit"
            >
              <Icon.Envelope /> Iniciar Sesión
            </Button>
            <Button
              id="btnFacebook"
              disabled={Loading}
              onClick={LoginFacebook}
              className="mt-2 w-100"
              type="button"
            >
              <Icon.Facebook /> Facebook
            </Button>
            <Button
              id="btnGMail"
              disabled={Loading}
              onClick={LoginGoogle}
              className="btn-danger mt-2 w-100"
              type="button"
            >
              <Icon.Google /> Gmail
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Olvido la Contraseña?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Necesita una cuenta? <Link to="/signup">Registrarte</Link>
      </div>
    </div>
  );
};

export default Login;
