//#region Imports
import { reactive, toRefs } from "vue";
//#endregion

export default () => {
  //#region Reactive References
  const state = reactive({});
  //#endregion

  //#region Watchers
  //#endregion

  //#region Lifecycle hooks
  //#endregion

  //#region Methods
  function handleAddNumbers(prevNumber, currentNumber) {
    return prevNumber + currentNumber;
  }

  function handleSubtractNumbers(prevNumber, currentNumber) {
    return prevNumber - currentNumber;
  }

  function handleMultiplyNumbers(prevNumber, currentNumber) {
    return prevNumber * currentNumber;
  }

  function handleDivideNumbers(prevNumber, currentNumber) {
    return prevNumber / currentNumber;
  }
  //#endregion

  return {
    ...toRefs(state),
    handleAddNumbers,
    handleSubtractNumbers,
    handleMultiplyNumbers,
    handleDivideNumbers,
  };
};
