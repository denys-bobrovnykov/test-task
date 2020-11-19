import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
    <Router>
      <Switch>
        <Route path="/test-task" exact>
          <Link id="employees-link" to="/test-task/employees">
            <h1>Go To Employees</h1>
          </Link>
        </Route>
        <Route path="/test-task/employees">
          <main className="App">
            <Employees />
            <EmployeesBirthday />
          </main>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
