// Define the base address that is being shared to all of the APIS

//TODO: For now this is on the localhost for the future it will be populated on the real domain so change the address
const BASE_URL = 'http://localhost:52928';

// DEFINE the APIs URLS

export const GOALS_URL = BASE_URL + '/app/goal';
export const GOAL_BY_ID = GOALS_URL + '/';
