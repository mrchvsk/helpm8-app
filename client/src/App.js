import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../src/components/Header'

import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Register from './pages/Register';
import Offers from './pages/Offers';
import Footer from './components/Footer';

export default function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <LandingPage />
                </Route>
                <Route path="/about" exact>
                    <About />
                </Route>
                <Route path="/register" exact>
                    <Register />
                </Route>
                <Route path="/offers" exact>
                    <Offers />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}
