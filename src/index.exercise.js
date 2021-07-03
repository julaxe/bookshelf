
import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'
function stateReducer(state, action){
    switch(action.type){
        case 'login':
            return {login: true, register: false}
        case 'register':
            return {login: false, register: true}
        case 'close':
            return {login: false, register: false}
        default:
            throw new Error('no action in the dispatcher function')
    }
}


function LoginForm({onSubmit, buttonText}){
    function handleSubmit(event){
        event.preventDefault()
        
        const {username, password} = event.target.elements //it gets the DOM element
        
        onSubmit({username: username.value, password: password.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{buttonText}</h2>
                <div>
                    <label htmlFor='username' >Username </label>
                    <input id='username' type='text'></input>
                </div>
                <div>
                    <label htmlFor='password'>Password </label>
                    <input id='password' type='password'></input>
                </div>
                <button type='submit'>{buttonText}</button>
            </form>
        </div>
    )
}

function App() {
    const [dialog, dispatcher] = React.useReducer(stateReducer, {login: false, register: false})
    
    function handleLogin(event){
        dispatcher({type:'login'})
    }

    function handleRegister(event){
        dispatcher({type:'register'})
    }

    function handleClose(event){
        dispatcher({type:'close'})
        console.log(dialog)
    }

    function login(formData)
    {
        console.log('login',formData)
    }
    function register(formData)
    {
        console.log('register', formData)
    }

    return (
        <div>
            <h1>Bookshelf</h1>
            <Logo width='100' height='100'></Logo>
            <div>
                <button value="login" onClick={handleLogin}>Login</button>
                <button value="register" onClick={handleRegister}>Register</button>
            </div>
            <Dialog aria-label="Login form" name='loginDialog' isOpen={dialog.login}>
                <button className="close-button" onClick={() => dispatcher({type: 'close'})}>
                    <span aria-hidden>×</span>
                </button>
                <LoginForm onSubmit={login} buttonText='Login' />
            </Dialog>
            <Dialog aria-label="Register form" name='registerDialog' isOpen={dialog.register}>
                <button className="close-button" onClick={handleClose}>
                    <span aria-hidden>×</span>
                </button>
                <LoginForm onSubmit={register} buttonText='Register' />
            </Dialog>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
