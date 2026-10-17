const counterA = createCounter(2);
const counterB = createCounter(10);

function createCounter(start) {
  let count = start;

  return function inner() {
    count++;

    return count;
  };
}

console.log(counterA());
console.log(counterB());
console.log(counterA());
console.log(counterA());
console.log(counterB());
