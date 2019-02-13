const initState = {};

export default function common(state = initState, action) {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}
