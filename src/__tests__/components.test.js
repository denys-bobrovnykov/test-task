import { render, cleanup } from '@testing-library/react';
import { act, create } from 'react-test-renderer';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { testData } from '../test-data/testData';
import * as states from '../test-data/states';
import App from '../components/App/App';
import { Item } from '../components/Item/Item';
import { Row } from '../components/Row/Row';
import { Employees } from '../components/Employees/Employees';
import { EmployeesBirthday } from '../components/EmployeesBirthday/EmployeesBirthday';
import { BirthdayMonth } from '../components/BirthdayMonth/BirthdayMonth';
import { SelectedItem } from '../components/SelectedItem/SelectedItem';

const mockStore = configureStore([thunk]);

describe('App tests', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ list: states.initialState });
  });
  afterEach(() => {
    store = null;
    cleanup();
  });

  test('App rendering home page', () => {
    const snapshot = create(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(snapshot.toJSON()).toMatchSnapshot();
  });
});

describe('Employee list item', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ list: states.initialState });
  });
  afterEach(() => (store = null));

  test('Renders initial state unchecked', () => {
    render(
      <Provider store={store}>
        <Item item={testData[0]} />
      </Provider>
    );
    expect(document.querySelector('input')).not.toBeChecked();
  });

  test('Renders selected state checked', () => {
    store = mockStore({ list: states.selectedState });
    const snapshot = render(
      <Provider store={store}>
        <Item item={testData[0]} />
      </Provider>
    );
    expect(document.querySelector('input')).toBeChecked();
  });
});

describe('Employees', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ list: states.initialState });
  });
  afterEach(() => (store = null));

  test('Renders alphabet as <Row props=Letter /> elements', () => {
    let component;
    act(() => {
      component = create(
        <Provider store={store}>
          <Employees />
        </Provider>
      );
    });
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    const rows = component.root.findAllByType(Row);
    rows.forEach((el, index) => {
      expect(el.props.letter).toEqual(alphabet[index]);
    });
    component.unmount();
  });
});

describe('Employees Birthday', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({ list: states.initialState });
  });
  afterEach(() => {
    store = null;
    component = null;
  });

  test('Renders "No selected employees" with nothing selected', () => {
    act(() => {
      component = create(
        <Provider store={store}>
          <EmployeesBirthday />
        </Provider>
      );
    });
    expect(component.root.findByType('h3').props.children).toContain('No selected employees');
    component.unmount();
  });

  test('Renders months as <BirthdayMonth /> with corresponding month text when selected', () => {
    store = mockStore({ list: states.selectedState });
    act(() => {
      component = create(
        <Provider store={store}>
          <EmployeesBirthday />
        </Provider>
      );
    });
    const dob = store.getState().list.selected[0].dob;
    const month = new Date(dob).toLocaleString('default', { month: 'long' });
    expect(component.root.findAllByType(BirthdayMonth)[0].props.month).toEqual(month);
    component.unmount();
  });

  test('Renders two people with same month bithday in the same <BirthdayMonth />', () => {
    store = mockStore({ list: states.selectedFebruary });
    act(() => {
      component = create(
        <Provider store={store}>
          <EmployeesBirthday />
        </Provider>
      );
    });
    const selectedPersons = component.root.findAllByType(SelectedItem);
    selectedPersons.forEach((person) => {
      expect(new Date(person.props.item.dob).getMonth()).toBe(1);
    });
    component.unmount();
  });
});
