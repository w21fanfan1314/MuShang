"# 慕尚酒吧小程序开发" 


1， 如何获取当前选择的门店和台号？
使用 core/MSShop.js
import MSShop from "/core/MSShop.js";
后
let shop = new MMShop();
获取门店信息
shop.shop
获取已选台号
shop.tableNo

2, 如何获取用户信息？
使用 net/user.js

import User from "net/user.js"
后
直接使用：User.info() 即可获取用户的数据