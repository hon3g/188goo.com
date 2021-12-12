import { PostFormActionTypes } from './post-form.types';

export function setPhoneNumber(phoneNumber) {
  return {
    type: PostFormActionTypes.SET_PHONE_NUMBER,
    payload: phoneNumber,
  };
}

export function setState(state) {
  return {
    type: PostFormActionTypes.SET_STATE,
    payload: state,
  };
}

export function setCity(city) {
  return {
    type: PostFormActionTypes.SET_CITY,
    payload: city,
  };
}

export function setCategory(category) {
  return {
    type: PostFormActionTypes.SET_CATEGORY,
    payload: category,
  };
}

export function setTitle(title) {
  return {
    type: PostFormActionTypes.SET_TITLE,
    payload: title,
  };
}

export function setDescription(description) {
  return {
    type: PostFormActionTypes.SET_DESCRIPTION,
    payload: description,
  };
}

export function setImages(images) {
  return {
    type: PostFormActionTypes.SET_IMAGES,
    payload: images,
  };
}
