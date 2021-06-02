// 객체지향 프로그래밍을 사용하는 이유

// var v1 = "v1";
// 10000개의 코드가 끼어들 수 있음
// v1 = 'egoing'; 이라고 넣어버리면 v1의 값이 바뀌며 엉뚱한 상황이 됨 -> 버그
// var v2 = "v2";

// 폴더에 파일을 정리하는 것과 같음
var o = {
  v1: "v1",
  v2: "v2",
  f1: function () {
    console.log(this.v1);
  },
  f2: function () {
    console.log(this.v2);
  },
};

o.f1();
o.f2();
