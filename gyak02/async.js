function waitFor(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      resolve();
    }, ms);    
  });
}

waitFor(1000).then(function () {
  console.log(1);
})
console.log(2);

function* gen() {
  const a = yield 1;
  const b = yield 2;
  yield a + b;
  return 42;
}

const it = gen();
console.log(it.next())
console.log(it.next(10))
console.log(it.next(32))
console.log(it.next())
console.log(it.next())
console.log(it.next())