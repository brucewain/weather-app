

export default function userReducer(state, action) {
    return { ...state, testDegree: state.testDegree === "F" ? "C" : "F"};
  }
