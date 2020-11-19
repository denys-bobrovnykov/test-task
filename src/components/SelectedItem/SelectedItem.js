import { useDispatch } from 'react-redux';
import { deselectEmployee } from '../../redux/actions/actionCreators';
import { dateDisplay } from '../../service/date-utils';
import './SelectedItem.scss';

export const SelectedItem = (props) => {
  const dispatch = useDispatch();
  const { firstName, lastName, dob } = props.item;

  const handleClick = (e) => {
    dispatch(deselectEmployee(props.item));
  };

  return (
    <li className="SelectedItem">
      <p onClick={handleClick}>
        {lastName} {firstName} - {dateDisplay(dob)}
      </p>
    </li>
  );
};
