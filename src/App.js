import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Homepage from "./pages/homepage/Homepage.jsx";
import ClinicList from "./pages/clinicList/ClinicList.jsx";
import News from "./pages/newsList/NewsList.jsx";
import NewsDetail from "./modules/news/NewsDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/clinicList" component={ClinicList} />
        <Route path="/news" exact component={News} />
        <Route path="/news/detail/:newsId" component={NewsDetail} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
