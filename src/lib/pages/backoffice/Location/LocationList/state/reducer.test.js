import reducer, { initialState } from './reducer';
import * as types from './types';

describe('Fetch location details reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state on loading action', () => {
    const action = {
      type: types.IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change data state on success action', () => {
    const location = { field: 123 };
    const action = {
      type: types.SUCCESS,
      payload: location,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      data: location,
      hasError: false,
    });
  });

  it('should change error state on error action', () => {
    const action = {
      type: types.HAS_ERROR,
      payload: { response: { status: 404 } },
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
      error: { response: { status: 404 } },
    });
  });
});

describe('Delete location reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state on location delete', () => {
    const action = {
      type: types.DELETE_IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should keep loading to re-fetch locations on deleted location success', () => {
    const action = {
      type: types.DELETE_SUCCESS,
      payload: { locationPid: 1 },
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change error state on delete error', () => {
    const action = {
      type: types.DELETE_HAS_ERROR,
      payload: { response: { status: 404 } },
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
      error: { response: { status: 404 } },
    });
  });
});
