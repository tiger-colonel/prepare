
const parseApiDoc = require('../../lowcode/api_doc');

const tableContent = `
    ### 公共方法   

        |  方法名称   | 功能说明  | parma  |  
        |  ----  | ----  |  ----  | 
        |    setForm(data)    | 初始化表单数据 |fff |
    ### 事件
        |  方法名称   | 功能说明  | parma  |  
        |  ----  | ----  |  ----  | 
        |   search    | 查询 |fff |
    `;

console.log(parseApiDoc(tableContent));
