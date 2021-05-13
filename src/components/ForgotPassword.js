import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Revisa tu correo para ver las instrucciones");
    } catch {
      setError("Algo ha fallado al reestablecer la contraseña");
    }
    setLoading(false);
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Restablecer Contraseña</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={Loading} className="mt-2 w-100" type="submit">
              Restablecer
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Iniciar Sesion</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Necesita una cuenta? <Link to="/signup">Registrarte</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
