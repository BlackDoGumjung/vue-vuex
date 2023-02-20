//기본형은 Store 폴더 내의 index.js 쪽에 작성 (혹은 Store.js로 작성)
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  //이 내부로 state actions 등록해주는...
  //state간 공유할 data 속성
  state: {
    counter: 0,
  },
  getters: {
    getCounter: function (state) {
      return state.counter;
    },
  },
  //getters를 등록, 동일하게 접근하려면 this$store 통해서 접근함!!

  // Mutations? Vuex의 데이터인 state값을 변경하는 로직 ( = setters )
  // Getters와 차이점 ? 인자 넘길 수 있음, methods 에 등록, 동기적 로직 처리
  mutations: {
    addCounter: function (state, payload) {
      // return state.counter++ <- 인자 안 받을 경우
      //인자를 받았을 경우 payload로 받을 수 있음!
      state.counter = payload.value;
    },
  },
  // actions는 비동기적인 로직, Mutations와 통합하지 않는 이유는 비동기 로직이 동기 로직과 마구 꼬이면 여러 컴포넌트에서 변경 요청했을 때 변경 순서 파악이 어렵기 때문이다
  // setTimeout(), 서버 http 통신 처리 같이 결과 받을 타이밍 예측 x => actions!
  actions: {
    addCounter: function (context) {
      return setTimeout(function () {
        context.commit('addCounter');
      }, 1000);
      //commit 받아오는 값은 mutation의 메서드!!
      //===> 상태 변화 추적을 위해 actions는 mutations 메서드를 호출(commit)하는 구조가 된다.
    },
    asyncIncrement: function(context, payload) {
      return setTimeout(function () {
        context.commit('increment', payload.by)
      }, payload.duration)
    }
  },
});

export default store;
