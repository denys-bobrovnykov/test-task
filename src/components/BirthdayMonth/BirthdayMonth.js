import { useSelector } from 'react-redux';
import { getMonth } from '../../service/date-utils';
import { SelectedItem } from '../SelectedItem/SelectedItem';
import './BirthdayMonth.scss';

export const BirthdayMonth = (props) => {
  const state = useSelector((state) => state.list);

  return (
    <div className="BirthdayMonth">
      <h3>{props.month}</h3>
      <ul>
        {state.selected
          .filter((el) => getMonth(el.dob) === props.month)
          .map((el) => (
            <SelectedItem key={el.id} item={el} />
          ))}
      </ul>
    </div>
  );
};
