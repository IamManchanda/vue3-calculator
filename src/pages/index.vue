<template>
  <div class="page-index">
    <calculator-container />
  </div>
</template>

<script>
import CalculatorContainer from "../components/calculator-container";

export default {
  name: "page-index",
  components: {
    CalculatorContainer,
  },
};
</script>

<style lang="scss" scoped>
.page-index {
}

@media screen and (max-width: 767px) {
  .page-index {
    width: 100vw;
  }
}
</style>
