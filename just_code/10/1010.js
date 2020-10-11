
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });
// 外部promise -- 外部第一个then -- 内部promise -- 内部第一个then -- 外部第二个then  -- 内部第二个then

// 外部promise -- 外部第一个then -- 内部promise -- 外部第二个then -- 内部第一个then --  内部promise -- 内部第二个then  错了

// 外部promise == 外部第一个then 内部promise 内部第一个then 外部第二个then 内部第二个then  错了

// 外部promise -- 外部第一个then -- 内部promise -- 内部promise2 -- 内部第一个then -- 内部第一个then2 -- n内部第二个then -- 内部第二个then2 -- 外部第二个then‘

// 外部promise -- 外部第一个then -- 内部promise -- 内部第一个then -- 外部第二个then -- 内部第二个then -- 外部第三个then
