
export const META_TICK = 12;
export const TIME_MARGIN = 2;

// Do we have enough time to set a metaTick?
export const META_THRESHOLD = (META_TICK * 2) + TIME_MARGIN;

export const MIN_TIME_LEFT = (META_TICK / 4); // (1/4 metaTick)

export const ZERO = 0;
export const TIME_PASSED = -1;

// export const ONE_SECOND_THRESHOLD = ONE_SECOND + TIME_MARGIN;
// export const MAX_SECOND_DELAY = 50;
// export const ONE_SECOND = 1000;
// export const HALF_A_SECOND = ONE_SECOND/2;
