import { CREATE_TEAM } from "../contstants";

const initialState = {
  teamData: []
};

const teamData = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEAM:
      return {
        ...state,
        teamData: [...state.teamData, action.payload]
      };

    default:
      return state;
  }
};

export default teamData;
