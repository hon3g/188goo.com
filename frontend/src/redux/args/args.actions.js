import { ArgsActionTypes } from './args.types';

export const setRegion = (region) => ({
  type: ArgsActionTypes.SET_REGION,
  payload: region,
});

export const setState = (state) => ({
  type: ArgsActionTypes.SET_STATE,
  payload: state,
});

export const setCity = (city) => ({
  type: ArgsActionTypes.SET_CITY,
  payload: city,
});

export const setType = (type) => ({
  type: ArgsActionTypes.SET_TYPE,
  payload: type,
});

export const setCategory = (category) => ({
  type: ArgsActionTypes.SET_CATEGORY,
  payload: category,
});

export const setSlug = (slug) => ({
  type: ArgsActionTypes.SET_SLUG,
  payload: slug,
});

export const setPage = (page) => ({
  type: ArgsActionTypes.SET_PAGE,
  payload: page,
});
