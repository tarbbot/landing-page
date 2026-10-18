// Moving masses published by lens.ts (comets in flight, in viewport pixels) that the page background bends
// the grid around. Each entry is one point of a comet: the head at s = 1 and its wake fading toward 0.
export const flyers: { x: number; y: number; s: number }[] = [];

// The black hole (viewport pixels), written by BlackHole.tsx each frame while it is on screen: s is 1 then
// and 0 otherwise. The grid bends around it and comets in flight are pulled toward it. `fed` counts the
// comets it has swallowed, so the hole can react.
export const mass = { x: 0, y: 0, r: 0, s: 0, fed: 0 };
