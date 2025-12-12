const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let character = [
    { id:1 , number:"DBL01-16S" , name:"パイクーハン" , color:"YEL" , tag:"あの世の戦士" } ,
    { id:1 , number:"DBL01-44S" , name:"ギニュー" , color:"GRN" , tag:"フリーザ軍", tag:"ギニュー特戦隊" } ,
    { id:1 , number:"DBL01-36S" , name:"孫悟飯 幼年期" , color:"YEL" , tag:"混血サイヤ人" , tag:"孫一族" , tag:"キッズ" } ,
] ;