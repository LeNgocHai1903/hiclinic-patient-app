import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer';
import Homepage from "./pages/homepage/Homepage.jsx";
import ClinicList from "./pages/clinicList/ClinicList.jsx";
import News from "./pages/newsList/NewsList.jsx";
import NewsDetail from "./modules/news/NewsDetails";

import * as routeType from './constant/route/route';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path={`${routeType.ROUTE_CLINICLIST_LIST}`} component={ClinicList} />
        <Route path={`${routeType.ROUTE_NEWS_LIST}`}  exact component={News} />
        <Route path={`${routeType.ROUTE_NEWS_DETAIL}`}  component={NewsDetail} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
