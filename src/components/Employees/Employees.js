import { Row } from '../Row/Row';
import './Employees.scss';

export const Employees = () => {
  // Create alphabet
  const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  const renderRows = () => {
    return letters.map((letter) => <Row key={letter} letter={letter} />);
  };

  return (
    <div className="container Employees">
      <h2>Employees</h2>
      <div className="scroller">{renderRows()}</div>
    </div>
  );
};
