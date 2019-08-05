import Mock from 'mockjs'

Mock.mock('/api/json', 'post', () => {
    const obj = {
        code: 1000,
        msg: "fff"
    };
    return obj;
});
// Mock.mock("/api/menu", 'get', () => {
//     const obj = [
//         {
//             interfaceId:1,
//             name: "菜单1",
//             children: [
//                 {
//                     interfaceId:2,
//                     name: "测试1",
//                     children:[],
//                 },
//                 {
//                     interfaceId:3,
//                     name: "测试axios",
//                     children:[],
//                 },
//             ]
//         },
//         {
//             interfaceId:4,
//             name: "菜单1",
//             children: [
//                 {
//                     interfaceId:5,
//                     name: "测试1",
//                     children:[],
//                 },
//                 {
//                     interfaceId:6,
//                     name: "测试axios",
//                     children:[],
//                 },
//             ]
//         }
//     ];
//     return obj;
// });
// Mock.mock("/api/interface", 'get', (id) => {
//     let tmp = JSON.parse(id.body);
//     const obj = {
//         title: "测试接口"+tmp.id,
//         requestMethod: "post",
//         requestUrl: "/api/login",
//         param: {
//             isJson: false,
//             isArray: false,
//             jsonData: "",
//             tableData: [
//                 {
//                     name: "name",
//                     desc: "姓名",
//                     type: "String",
//                     isRequire: true,
//                     isArray: false,
//                     isEntity: false,
//                     children: [],
//                 },
//                 {
//                     name: "age",
//                     desc: "年龄",
//                     type: "Integer",
//                     isArray: false,
//                     isRequire: true,
//                     isEntity: false,
//                     children: [],
//                 },
//                 {
//                     name: "class",
//                     desc: "类别",
//                     type: "Integer[]",
//                     isArray: true,
//                     isRequire: true,
//                     isEntity: false,
//                     children: [],
//                 },
//             ],
//         },
//         resp: {
//             isJson: true,
//             isArray: true,
//             jsonData: "",
//             tableData: [
//                 {
//                     name: "name",
//                     desc: "姓名",
//                     type: "String",
//                     isArray: false,
//                     isEntity: false
//                 },
//                 {
//                     name: "age",
//                     desc: "年龄",
//                     type: "Integer",
//                     isArray: false,
//                     isEntity: false
//                 },
//                 {
//                     name: "teacher",
//                     desc: "导师",
//                     type: "TeacherDTO[]",
//                     isArray: true,
//                     isEntity: true,
//                     children: [
//                         {
//                             name: "name",
//                             desc: "姓名",
//                             type: "String",
//                             isArray: false,
//                             isEntity: false,
//                         }
//                     ]
//                 },
//             ]
//         },
//     };
//     return obj;
// });


export default Mock;