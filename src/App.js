import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import withAuthPersist from './store/authenticate/withAuthPersist';
import './store/middleware/persitent';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import ClinicList from './modules/clinicList/ClinicList';
import ClinicDetails from './pages/clinicDetails/ClinicDetails';
import Homepage from './pages/homepage/Homepage';
import News from './modules/newsList/NewsList';
import NewsDetail from './modules/newsList/newsDetails/NewsDetails';
import MyProfile from './modules/myProfile/MyProfile';

import * as routeType from './constant/route/route';

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path={`${routeType.ROUTE_SIGN_IN}`} component={SignIn} />
      <Route path={`${routeType.ROUTE_SIGN_UP}`} component={SignUp} />
      <Route path={`${routeType.ROUTE_CLINICLIST_LIST}`} component={ClinicList} />
      <Route path={`${routeType.ROUTE_NEWS_LIST}`} exact component={News} />
      <Route path={`${routeType.ROUTE_NEWS_DETAIL}`} component={NewsDetail} />
      <Route path={`${routeType.ROUTE_CLINIC_DETAIL}`} component={ClinicDetails} />
      <Route path={`${routeType.ROUTE_MY_PROFILE}`} component={MyProfile} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Header />
      {routes}
      <Footer />
    </BrowserRouter>
  );
}

export default withAuthPersist(App);
