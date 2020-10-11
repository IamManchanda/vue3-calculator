<template>
  <div class="component-calculator-container">
    <div class="calculator-display-group">
      <h1 class="calculator-display">{{ calculatorDisplay }}</h1>
    </div>
    <div class="calculator-buttons">
      <button class="operator" @click="handleOperatorButton('+')">
        &plus;
      </button>
      <button class="operator" @click="handleOperatorButton('-')">
        &minus;
      </button>
      <button class="operator" @click="handleOperatorButton('*')">
        &times;
      </button>
      <button class="operator" @click="handleOperatorButton('/')">
        &div;
      </button>

      <button @click="handleNumberButton('7')">7</button>
      <button @click="handleNumberButton('8')">8</button>
      <button @click="handleNumberButton('9')">9</button>
      <button @click="handleNumberButton('4')">4</button>
      <button @click="handleNumberButton('5')">5</button>
      <button @click="handleNumberButton('6')">6</button>
      <button @click="handleNumberButton('1')">1</button>
      <button @click="handleNumberButton('2')">2</button>
      <button @click="handleNumberButton('3')">3</button>

      <button class="decimal" @click="handleDecimalButton">.</button>

      <button @click="handleNumberButton('0')">0</button>

      <button class="clear" @click="handleClearButton">C</button>

      <button class="equal-sign operator" @click="handleOperatorButton('=')">
        &equals;
      </button>
    </div>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs } from "vue";
import useCalculator from "../composables/use-calculator";
//#endregion
export default {
  name: "component-calculator-container",
  setup() {
    //#region Composables
    const {
      handleAddNumbers,
      handleSubtractNumbers,
      handleMultiplyNumbers,
      handleDivideNumbers,
    } = useCalculator();
    //#endregion

    //#region Reactive References
    const state = reactive({
      calculatorDisplay: "0",
    });

    const localState = reactive({
      prevValue: 0,
      operatorValue: "",
      awaitingNextValue: false,
    });
    //#endregion

    //#region Other Variables
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    function handleNumberButton(number) {
      if (localState.awaitingNextValue) {
        state.calculatorDisplay = number;
        localState.awaitingNextValue = false;
      } else {
        const displayValue = state.calculatorDisplay;
        state.calculatorDisplay =
          displayValue === "0" ? number : displayValue + number;
      }
    }

    function handleCalculation(currentValue) {
      switch (localState.operatorValue) {
        case "+":
          return handleAddNumbers(localState.prevValue, currentValue);
        case "-":
          return handleSubtractNumbers(localState.prevValue, currentValue);
        case "*":
          return handleMultiplyNumbers(localState.prevValue, currentValue);
        case "/":
          return handleDivideNumbers(localState.prevValue, currentValue);
        case "=":
          return currentValue;
        default:
          return 0;
      }
    }

    function handleOperatorButton(operator) {
      if (localState.operatorValue && localState.awaitingNextValue) {
        localState.operatorValue = operator;
        return;
      }
      const currentValue = Number(state.calculatorDisplay);
      if (!localState.prevValue) {
        localState.prevValue = currentValue;
      } else {
        const calculation = handleCalculation(currentValue);
        state.calculatorDisplay = calculation;
        localState.prevValue = calculation;
      }
      localState.awaitingNextValue = true;
      localState.operatorValue = operator;
    }

    function handleDecimalButton() {
      if (localState.awaitingNextValue) return;
      if (!state.calculatorDisplay.includes(".")) {
        state.calculatorDisplay = `${state.calculatorDisplay}.`;
      }
    }

    function handleClearButton() {
      localState.prevValue = 0;
      localState.operatorValue = "";
      localState.awaitingNextValue = false;
      state.calculatorDisplay = 0;
    }
    //#endregion

    return {
      ...toRefs(state),
      handleNumberButton,
      handleOperatorButton,
      handleDecimalButton,
      handleClearButton,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-calculator-container {
  background-color: white;
  width: 400px;
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 3rem -0.5rem rgba(0, 0, 0, 0.8);

  .calculator-display-group {
    background-color: black;
    color: white;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 0.625rem 0.625rem 0 0;
  }

  .calculator-display {
    margin: 0;
    padding: 1.5rem;
    font-size: 2.5rem;
    font-family: "Inconsolata", monospace;
    overflow-x: auto;
  }

  .calculator-buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    padding: 0.625rem;
  }

  button {
    min-height: 50px;
    font-size: 1.25rem;
    border: none;
    border-radius: 0.3125rem;
    cursor: pointer;
    background-color: rgb(199, 199, 199);

    &:hover {
      filter: brightness(110%);
      border: 0.0625rem solid #ccc;
    }

    &:active {
      transform: translateY(0.0625rem);
    }

    &:focus {
      outline: none;
    }
  }

  .operator {
    background-color: grey;
    color: white;
    font-size: 1.875rem;
  }

  .clear {
    background-color: rgb(255, 40, 40);
    color: white;

    &:hover {
      filter: brightness(90%);
    }
  }

  .equal-sign {
    grid-column: -2;
    grid-row: 2 / span 4;
    background-color: rgb(13, 206, 87);
  }
}

@media screen and (max-width: 767px) {
  .component-calculator-container {
    width: 95%;
    margin: 0 auto;
  }
}
</style>
