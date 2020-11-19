import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Item } from '../Item/Item';
import './Row.scss';

export const Row = (props) => {
  const state = useSelector((state) => state.list);

  const filteredNames = state.data
    .filter((item) => item.lastName.toUpperCase()[0] === props.letter)
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  const renderNames = () => {
    if (state.isLoaded && filteredNames.length > 0) {
      return filteredNames.map((item) => <Item key={item.id} item={item} />);
    } else {
      return '------';
    }
  };

  useEffect(() => {}, [state.selected]);

  return (
    <div className="Row">
      <h3>{props.letter}</h3>
      <ul>{renderNames()}</ul>
    </div>
  );
};
