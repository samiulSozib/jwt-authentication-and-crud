import { Fragment } from "react";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import ProfilePage from "./page/ProfilePage";
import AddNotes from "./page/AddNotes";
import UpdatePage from "./page/UpdatePage";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <Route exact path="/register">
          <RegisterPage/>
        </Route>
        <Route exact path="/profile">
          <ProfilePage/>
        </Route>
        <Route exact path="/add-notes">
          <AddNotes/>
        </Route>
        <Route exact path="/update-note">
          <UpdatePage/>
        </Route>
        <Route exact path="/">
          <HomePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
