import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deselectEmployee, selectEmployee } from '../../redux/actions/actionCreators';
import './Item.scss';

export const Item = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.list);
  const [checkbox, setCheckbox] = useState(false);
  const { id, firstName, lastName } = props.item;

  const handleTick = () => {
    setCheckbox(state.selected.find((item) => item.id === id) !== undefined);
  };

  const handleClick = (e) => {
    setCheckbox(e.target.checked);
    if (e.target.checked) {
      dispatch(selectEmployee(props.item));
    } else {
      dispatch(deselectEmployee(props.item));
    }
  };

  useEffect(() => {
    handleTick();
  });

  return (
    <div className="Item">
      <label className="Item-name">
        {lastName} {firstName}
        <input
          className="Item-checkbox"
          type="checkbox"
          checked={checkbox}
          onChange={handleClick}
        />
      </label>
    </div>
  );
};
