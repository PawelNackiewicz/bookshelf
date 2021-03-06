import '@reach/dialog/styles.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Dialog } from '@reach/dialog';
import { Logo } from './components/logo';

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type LoginFormProps = {
  onSubmit: (formData: LoginFormInputs) => void;
  buttonText: string;
};

type LoginFormInputs = {
  username: string;
  password: string;
};

type ModalState = 'none' | 'login' | 'register';

function LoginForm({ onSubmit, buttonText }: LoginFormProps) {
  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    const { username, password } = event.currentTarget.elements;

    onSubmit({
      username: username.value,
      password: password.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
}

function App() {
  const [openModal, setOpenModal] = React.useState<ModalState>('none');

  function login(formData: LoginFormInputs) {
    // console.log('login', formData)
  }

  function register(formData: LoginFormInputs) {
    // console.log('register', formData)
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
