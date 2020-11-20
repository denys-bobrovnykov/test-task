import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { fetchData } from '../../redux/actions/actionCreators';
import { Employees } from '../Employees/Employees';
import { EmployeesBirthday } from '../EmployeesBirthday/EmployeesBirthday';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Link id="employees-link" to="/employees">
            <h1>Go To Employees</h1>
          </Link>
        </Route>
        <Route path="/employees">
          <main className="App">
            <Employees />
            <EmployeesBirthday />
          </main>
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
