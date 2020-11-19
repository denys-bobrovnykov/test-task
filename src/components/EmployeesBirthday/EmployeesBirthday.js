import { useSelector } from 'react-redux';
import { getMonth } from '../../service/date-utils';
import { BirthdayMonth } from '../BirthdayMonth/BirthdayMonth';
import './EmployeesBirthday.scss';

export const EmployeesBirthday = () => {
  const state = useSelector((state) => state.list);
  const months = [];

  const renderMonths = () => {
    return months.length > 0 ? (
      months.map((el) => <BirthdayMonth key={el} month={el} />)
    ) : (
      <h3 className="empty-title">No selected employees</h3>
    );
  };
  // Select all months which are in selected state
  state.selected.forEach((el) => {
    const month = getMonth(el.dob);
    if (months.indexOf(month) === -1) {
      months.push(month);
    }
  });

  return (
    <div className="container EmployeesBirthday">
      <h2>Employees birthday</h2>
      <div className="wrapper">
        <div className="presentation">{renderMonths()}</div>
      </div>
    </div>
  );
};
