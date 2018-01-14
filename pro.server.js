var express = require('express');
var port = 8088;

var app = express();


var router = express.Router();

router.get('/', function(req, res, next){
  req.url = "/index.html";
  next();
});


app.use(router);


// 接口數據

// 1、读取json数据

var goods = require('./data/01-商品页(点菜).json');

var ratings = require('./data/02-商品页(评价).json');

var seller = require('./data/03-商品页(商家).json');

//2 路由

var routers = express.Router();


//編寫接口
routers.get('/goods', (req, res) => {

  // 返回数据给客户端，返回json数据

  res.json(goods);

}),

routers.get('/ratings', (req, res) => {

    // 返回数据给客户端，返回json数据

    res.json(ratings);

  }),

  routers.get('/seller', (req, res) => {

    // 返回数据给客户端，返回json数据

    res.json(seller);

  })


  //4. 中間件
  app.use('/api',routers);


//定義 static目錄，指向./dist目錄
app.use(express.static('./dist'));

//啟動express
module.express = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('http://localhost：' + port + '\n');
});

// module.express = function(){console.log('aaa')};