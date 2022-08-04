import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './navbar/Navbar'
import Registration from './authorization/Registration'
import Login from './authorization/Login'
import { auth } from '../actions/user'
import './app.css'
import Disk from './disk/Disk'

function App() {
    const isAuth = useSelector((state) => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <div className="wrap">
                    {
                        !isAuth ? (
                            <Switch>
                                <Route path="/registration" component={Registration} />
                                <Route path="/login" component={Login} />
                                <Redirect to='/login' />
                            </Switch>
                        ) : (
                            <Switch>
                                <Route exact path="/" component={Disk} />
                                <Redirect to='/' />
                            </Switch>
                        )
                    }
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
