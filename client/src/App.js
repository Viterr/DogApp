import React from "react";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.jsx";
import Detail from "./components/Detail/Detail.jsx";
import BreedList from "./components/BreedList/BreedList.jsx";
import AddBreed from "./components/AddBreed/AddBreed.jsx";
import SuccessPage from "./components/SuccessPage/SuccessPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import './App.css'; 
import WelcomePage from "./components/WelcomePage/WelcomePage.jsx";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          < >
            <NavBar />
            <Route exact path='/doglist' component={BreedList} />
            <Route exact path="/add" component={AddBreed} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/success" component={SuccessPage} />
            <Redirect from="*" to="/doglist"></Redirect>
            <Footer />
          </>
        </Switch>
    </Router>
  );
}

export default App;
