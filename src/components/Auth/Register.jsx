import './auth.css';
import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo_main.svg';
import { useFormValidation } from '../../hooks/useForm';

const Register = ({ onRegister, registerError }) => {
    const {  values, errors, isValid, handleChange, resetForm } = useFormValidation();
    /*
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ name, email, password });
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }*/
    useEffect(() => {
        resetForm({}, {}, false);
      }, [resetForm]);
    
      function handleSubmit(e) {
        e.preventDefault();
        onRegister(values);
      }


    return (
        <section className="auth">
            <Link to='/'><img className='auth__logo' src={logo} alt="лого" /></Link>
            <h1 className="auth__title">Добро пожаловать</h1>
            <form className="auth__form" name="auth-form" onSubmit={handleSubmit}>
                <fieldset className="auth__fieldset">
                    <label htmlFor="name-input" className='auth__label'>Имя</label>
                    <input id="name-input"
                    className="auth__input"
                    type="name"
                    name="name"
                    minLength="2" maxLength="40" 
                    required
                    value={values.name || ''}
                    onChange={handleChange}></input>
                    <span className='auth__input-error name-input-error'>{errors.name || ''}</span>
                    <label htmlFor="email-input" className='auth__label'>E-mail</label>
                    <input id="email-input"
                    className="auth__input"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    type="email"
                    name="email" 
                    required value={values.email || ''} onChange={handleChange}/>
                    <span className='auth__input-error email-input-error'>{errors.email || ''}</span>
                    <label htmlFor="password-input" className='auth__label'>Пароль</label>
                    <input className="auth__input"
                    type="password"
                    name="password"
                    required value={values.password || ''}
                    onChange={handleChange}/>
                    <span className='auth__input-error password-input-error'>{errors.password || ''}</span>
                </fieldset>
                <span className='auth__input-error'>{registerError}</span>
            <button className="auth__button" disabled={!isValid} type="submit">Зарегистрироваться</button>
            </form>
            <div className="auth__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/signin" className="auth__bottom-link">Войти</Link>
            </div>
        </section>
    )
}

export default Register;



