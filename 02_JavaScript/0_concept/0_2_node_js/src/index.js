/**
 * 1. 모듈 시스템 : 모듈을 다루는 시스템
 *
 * 대표적으로 사용하는 모듈 시스템
 * 1) Common JS(CJS)
 * 2) ES Module (ESM)
 * 둘은 혼용이 불가능 하다.
 **/

// common module system
// const moudleData = require('./math.js');
// console.log(moudleData.add(1,2));
// console.log(moudleData.sub(1,2));

//  ES Module system; => 리엑트에서도 사용하는 시스템
// CJS 시스템을 사용할 떄는 확장자명 명시가 필수가 아니나 ESM 시스템을 사용 할 경우 확장자명은 필수
//export default 함수는 중괄호 없이 불러오며, 단독으로 불러 올 수 있으며 이름을 바꿔 불러오기 가능
import mul, { add, sub } from './math.js'; // 동일 경로는 합쳐서 불러오기 가능

console.log(add(1, 2));
console.log(sub(1, 2));
console.log(mul(2, 5));
