import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Las contraseñas no coinciden");
    }

    const promises = [];
    setError("");
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Error al actualizar la cuenta");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Actualizar Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Dejar en blanco para mantener la misma contraseña"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Dejar en blanco para mantener la misma contraseña"
              />
            </Form.Group>
            <Button disabled={Loading} className="mt-2 w-100" type="submit">
              Actualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancelar</Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
