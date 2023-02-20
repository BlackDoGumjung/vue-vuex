<template>
  <div id="app">
    Parent counter : {{ counter }}, Parent counter :
    {{ this.$store.state.counter }}, Parent counter : {{ parentCounter }}
    <button @click="addCounter">+</button>
    <button @click="subCounter">-</button>
    <!-- 이 아래로 Child 컴포넌트를 등록, counter 데이터 속성을 props 로 전달 
    이렇게 되면 parent와 child는 동일 counter 값을 가지게 됨 -->

    <!-- actions 사용하면서 인수를 여러개 보내려면 key : value 형태로 전달함!!  -->
    <button @click="asyncIncrement({ by: 50, duration: 500 })">
      Increment
    </button>

    <!-- vuex를 사용하면 이제 이벤트 전달을 이용할 필요가 없음 -->
    <child :num="counter"></child>
    <!-- 위에 나와있는 코드를... -->
    <child></child>
    <!-- 이렇게만 써도 충분! 그리고 child.vue 에서도 data를 vuex에서 받아오는 state로 대체하기!-->
  </div>
</template>

<script>
import Child from './Child.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    child: Child,
  },
  // 컴포넌트를 불러오는 부모 쪽에서 어떤 컴포넌트를 가져오는 건지 형식을 지정해줌
  // 대문자 형을 굳이~~ 쓸 필요는 없고, 이쪽에서 소문자 형식으로 바꿔줄 수 있음!
  // 그럼 위에서 컴포넌트를 불러올 때도 Child가 아니라 child로 불러와야함
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    addCounter() {
      this.counter++;
      this.$store.state.counter++
      //mutations를 이용하면 commit으로 등록한 함수를 전달 받는다!
      // this.$store.commit('함수명'), getters와 달리 commit을 꼭 넣어야 호출이 됨...
      this.$store.commit('addCounter');
      // 특정 값을 넘기고 싶으면 commit() 두번째 인자 추가!
      this.$store.commit('addCounter', 100)
      this.$store.commit('addCounter', {
        value: 10,
        arr: ['a', 'b', 'c']
      })
      //actions를 사용한 호출! (비동기 동작)
      this.$store.dispatch('addCounter')
    },
    subCounter() {
      this.couneter--;
      this.$store.state.counter--
    }
    ...mapMutations([
      'addCounter'
    ]),
    // vuex, app.vue 메서드 명이 동일할 때는 [ ]
    ...mapMutations({
      addCounter: 'addCounter'
      // 앞쪽이 app.vue 메서드, 뒤가 vuex의 Mutations
    })
    // 메서드명이 다르게 매칭될 때는 { }

    //actions도 mapGetters, mapMutations와 사용 방식은 비슷허다...
    ...mapActions([
      'asyncIncrement',
      'asyncDecrement'
    ])
  },
  //원본 데이터를 계산된 데이터로 새롭게 만들어 활용할 수 있는 속성
  // (원본은 그대로 있는데 뭐... 일부만 추출한다거나... 숫자라면 몇 번 이상만 출력하고 싶다거나...
  // 순서를 뒤바꾼다거나, 특정 계산식을 사용한 데이터를 가져오고 싶을 때 이용하는 건가???)

  // 동일 연산을 하되 같은 결과값을 반환해야하는 경우 === 캐싱!
  computed: {
    parentCounter() {
      return this.$store.state.counter;
      // this.$store.getters.getCounter;
      // state를 가져올 때와 동일한 방법으로 가져와서 사용하면 된당
      // 추가 계산 로직이 들어갔을 때 캐칭 효과가 발휘!
    },

    //상단에서 import한 뒤 store > index.js에 미리 등록된 getCounter를 바로 가져오는 방식으로 간략하게 쓸 수 있음...
    mapGetters({
      parentCounter: 'getCounter'
    })
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
