import { CREATE_TEAM } from "../contstants";

export const createTeam = (data) => {
  return {
    type: CREATE_TEAM,
    payload: data
  };
};
