var express = require('express');
var app = express();

var graphqlHTTP = require('express-graphql');
var {graphql, buildSchema } = require('graphql');

//定义schema 一定要写 type Query{}这是在定义查询的对象有哪些

// 定义查询的模型结构
var rootschema = buildSchema(`

    type Query {
        user:User
        computers:Computers
    }
    
    type User{
        name: String
        sex: String
        intro: String
        foods:Foods
    }
    type Foods {
        food_name:String
        price:Int
    }
   
    type Computers {
        name:String
        price:Int
        count:Int
    }
   
`);
// 创建查询结果数据
var root = {

    user: {
        name: '哈哈哈',
        sex: '男',
        intro: '一个小职员，正在奋斗的青年',
        foods:{
          food_name:'红番茄',
          price:2
        }
    },
    computers:{
        name:'Mac Pro',
        count:100,
        price:20000,
    }
};



//处理路由
app.use('/home', graphqlHTTP({
    schema: rootschema,
    rootValue: root,
    graphiql: true, //启用GraphiQL视图
}));


// 定义查询的模型结构
var goodschema = buildSchema(`
    type Query {
        goods:Goods
    }
    type Goods{
        price:Int,
        name:String,
        count:Int
    }

`);
// 创建查询结果数据
var goodsData = {
    goods:{
        price:111,
        name:'红茶',
        count:10
    }
};
//处理路由
app.use('/goods', graphqlHTTP({
    schema: goodschema,
    rootValue: goodsData,
    graphiql: true, //启用GraphiQL
}));

app.listen(8000, () => console.log('请在浏览器中打开地址：http://localhost:8000/home 或者 http://localhost:8000/goods'));

/*
//在界面输入如下结构，点击运行按钮
示例:http://localhost:8000/home
{
  user{
    name
    sex
  }
}
示例:http://localhost:8000/home
{
    computers{
       name
    }
}

示例:http://localhost:8000/goods
{
    goods{
       name
    }
}

* */