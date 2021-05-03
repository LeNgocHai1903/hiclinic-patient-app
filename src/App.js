import { useCallback, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext';

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer';
import ClinicDetails from './pages/clinicDetails/ClinicDetails';
import Homepage from './pages/homepage/Homepage.jsx';
import ClinicList from './modules/clinicList/ClinicList.jsx';
import News from './pages/newsList/NewsList.jsx';
import NewsDetail from './modules/news/NewsDetails';
import SignIn from './pages/signIn/SignIn';

import * as routeType from './constant/route/route';

function App() {
  const [authTokens, setAuthtokens] = useState(localStorage.getItem('tokens') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('tokens')) {
      setIsLoggedIn(true);
      setUserId(JSON.parse(authTokens).id);
    }
  }, []);

  const login = useCallback((uid, token) => {
    setAuthtokens(token);
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const routes = (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/signin" component={SignIn} />
      <Route path={`${routeType.ROUTE_CLINICLIST_LIST}`} component={ClinicList} />
      <Route path={`${routeType.ROUTE_NEWS_LIST}`} exact component={News} />
      <Route path={`${routeType.ROUTE_NEWS_DETAIL}`} component={NewsDetail} />
      <Route path={`${routeType.ROUTE_CLINIC_DETAIL}`} component={ClinicDetails} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
        authTokens: JSON.parse(authTokens),
      }}
    >
      <BrowserRouter>
        <Header />
        {routes}
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
