<template>
  <div>
    Child counter : {{ num }} Child counter :
    {{ this.$store.state.counter }} Child counter : {{ childCounter }}
    <!-- 세 개는 완전히 같아지는 셈!!! template은 간결하게 둬야하기 때문에...
      computed 쪽에 값을 넣어서 진행해도 됨 -->
    <button>+</button>
    <button>-</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  // 자식에서 props를 받아오는 입장이라서 자식 컴포넌트에 props를 써줘야함
  // 요약 부모 : components, 자식 : props
  props: ['num'],
  // vuex를 사용하면 위의 props가 필요 없게되 ㅇㅇ counter로 바로 접근하면 되니까~
  data() {
    return {};
  },
  computed: {
    childCounter() {
      return this.$store.state.counter;
      // this.$store.getters.getCounter;
      // getters를 등록해서 이용하려면 state를 사용할 떄와 동일하게 이용하면 된드아...
      // Mutations와 달리 단순 계산이라 아무것도 안 붙이고 사용해도 ㅇㅋ! (mutations는 commt 키워드 필요!)
    },
  },
};
</script>

<style></style>
