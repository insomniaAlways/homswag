import { PACKAGE_REQUEST_INITIATED, PACKAGE_REQUEST_SUCCESS, PACKAGE_REQUEST_FAILED } from '../actionTypes';

import { query, findRecord } from '../asyncActions/index';

const packages = [
  {
    "name": "Beauty & Relax",
    "price": "1799",
    "image_url": 'https://i.picsum.photos/id/1033/400/200.jpg',
    "items": [
      {
        "name": "Rica Full Arms – Waxing"
      },
      {
        "name": "Rica Half Legs – Waxing"
      },
      {
        "name": "Facial"
      },
      {
        "name": "Hair Spa"
      },
      {
        "name": "Eye Brows"
      },
      {
        "name": "Upper Lip"
      },
      {
        "name": "Pedicure Detan"
      },
      {
        "name": "Manicure Detan"
      }
    ]
  },
  {
    "name": "P1-Tip To Toe (Women)",
    "price": "1199",
    "image_url": 'https://i.picsum.photos/id/1034/400/200.jpg',
    "items": [
      {
        "name": "Rica Full Arms – Waxing"
      },
      {
        "name": "Rica Full Legs – Waxing"
      },
      {
        "name": "Aroma Manicure"
      },
      {
        "name": "Aroma Pedicure"
      },
      {
        "name": "Face Clean up"
      },
      {
        "name": "Eye Brows"
      },
      {
        "name": "Upper Lip"
      }
    ]
  },
  {
    "name": "P2 - Tip To Toe",
    "price": "1099",
    "image_url": 'https://i.picsum.photos/id/1035/400/200.jpg',
    "items": [
      {
        "name": "Honey – Full Arms & Under Arms – Waxing"
      },
      {
        "name": "Honey – Full Legs – Waxing"
      },
      {
        "name": "Aroma Manicure"
      },
      {
        "name": "Face Clean up"
      },
      {
        "name": "Eye Brows"
      },
      {
        "name": "Upper Lip"
      }
    ]
  },
  {
    "name": "Express pack",
    "price": "499",
    "image_url": 'https://i.picsum.photos/id/1036/400/200.jpg',
    "items": [
      {
        "name": "Full Arms / UA"
      },
      {
        "name": "Full Legs"
      },
      {
        "name": "Eye Brows"
      },
      {
        "name": "Upper Lip"
      }
    ]
  }
]

export const fetchPackage = () => {
  return function(dispatch) {
    dispatch(onStart())
    return onSuccess(packages)
  }
}

export const onStart = () => {
  return {
    type: PACKAGE_REQUEST_INITIATED
  }
}

export const onSuccess = (payload) => {
  return {
    type: PACKAGE_REQUEST_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: PACKAGE_REQUEST_FAILED,
    payload: error
  }
}