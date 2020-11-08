function toTree(arr) {
  let res = [];
  if (!Array.isArray(arr)) {
    return res;
  }
  arr.forEach(ele => {
    delete ele.children;
  })
  let obj = {};
  arr.forEach(ele => {
    obj[ele.id] = ele;
  });
  arr.forEach(ele => {
    let p = obj[ele.parent];
    if (p) {
      (p.children || (p.children = [])).push(ele);
    } else {
      res.push(ele);
    }
  })
  return res; 
}
let arr = [
  { id: 2, text: '研发计划', parent: 1 },
  { id: 3, text: '产品方案', parent: 1 },
  { id: 5, text: '技术方案', parent: 2 },
  { id: 4, text: '第二主题' },
  { id: 1, text: '中心主题' },
];

let a= toTree(arr)
console.log('-----a-----', a);



