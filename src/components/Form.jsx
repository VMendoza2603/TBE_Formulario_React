import { useState } from 'react';
import '../styles/Form.css';

function Form() {
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validators = {
    name: (v) => {
      if (!v.trim()) return 'El nombre es obligatorio';
      if (v.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
      return '';
    },
    email: (v) => {
      if (!v.trim()) return 'El correo es obligatorio';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Formato de correo inválido';
      return '';
    },
    password: (v) => {
      if (!v) return 'La contraseña es obligatoria';
      if (v.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
      return '';
    },
    age: (v) => {
      if (!v) return 'La edad es obligatoria';
      if (!/^\d+$/.test(v)) return 'La edad debe ser un número';
      if (Number(v) < 1 || Number(v) > 120) return 'La edad debe estar entre 1 y 120';
      return '';
    },
  };

  function getFieldClass(name) {
    if (!touched[name] && !submitted) return '';
    if (errors[name]) return 'error';
    return 'success';
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = {};
    for (const key of Object.keys(validators)) {
      newErrors[key] = validators[key](form[key]);
    }
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    if (isValid) {
      setTouched({});
      setForm({ name: '', email: '', password: '', age: '' });
      setSubmitted(false);
    }
  }

  function isValid() {
    return Object.values(errors).every((err) => err === '') &&
      Object.values(form).every((v) => v.trim ? v.trim() !== '' : v !== '');
  }

  return (
    <main>
      <section>
        <h1>Formulario de Registro</h1>
        <form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Datos personales</legend>

            <div className="form-field">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                className={getFieldClass('name')}
                onInput={handleInput}
                onBlur={handleBlur}
              />
              <span className="error-text">{errors.name || ''}</span>
            </div>

            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={form.email}
                className={getFieldClass('email')}
                onInput={handleInput}
                onBlur={handleBlur}
              />
              <span className="error-text">{errors.email || ''}</span>
            </div>

            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                className={getFieldClass('password')}
                onInput={handleInput}
                onBlur={handleBlur}
              />
              <span className="error-text">{errors.password || ''}</span>
            </div>

            <div className="form-field">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                name="age"
                type="text"
                placeholder="Tu edad"
                value={form.age}
                className={getFieldClass('age')}
                onInput={handleInput}
                onBlur={handleBlur}
              />
              <span className="error-text">{errors.age || ''}</span>
            </div>
          </fieldset>

          <button type="submit" disabled={!isValid() && submitted}>
            Enviar
          </button>

          {submitted && Object.values(errors).every((e) => e === '') && (
            <p className="form-footer success">¡Formulario enviado con éxito!</p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Form;
