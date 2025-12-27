"use strict";

const express = require("express");
const app = express();

const multer = require('multer');
const fs = require('fs');

const uplood = multer ( { dest: 'public/img/' } );

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let character = [
    { id:1 , code:"DBL07-11S" , name:"破壊神 ビルス" , color:"GRN" , tag: ["破壊神" , "神の気" , "双子" , "強大な敵"] } ,
    { id:2 , code:"DBL10-06S" , name:"超サイヤ人2 孫悟飯:少年期" , color:"RED" , tag: ["混血サイヤ人" , "孫一族" , "超サイヤ人2"] } ,
    { id:3 , code:"DBL12-06S" , name:"超サイヤ人 孫悟天：幼年期" , color:"PUR" , tag: ["混血サイヤ人", "孫一族" , "超サイヤ人" , "キッズ"] } ,
    { id:4 , code:"DBL13-03S" , name:"超ベジット" , color:"PUR" , tag: ["サイヤ人" , "超サイヤ人" , "合体戦士" , "ポタラ"] } ,
    { id:5 , code:"DBL15-05S" , name:"孫悟空" , color:"BLU" , tag: ["サイヤ人" , "孫一族"] } ,
    { id:6 , code:"DBL17-05S" , name:"超サイヤ人3 孫悟空" , color:"GRN" , tag: ["サイヤ人" , "超サイヤ人3" , "孫一族"] } ,
    { id:7 , code:"DBL18-05S" , name:"超サイヤ人ゴッドSS ベジータ" , color:"GRN" , tag: ["サイヤ人" , "ベジータ一族" , "神の気" , "超サイヤ人ゴッドSS" , "未来"] } ,
    { id:8 , code:"DBL22-03S" , name:"ピッコロ" , color:"YEL" , tag: ["再生" , "ナメック星人"] } ,
    { id:9 , code:"DBL22-05S" , name:"第一形態 フリーザ" , color:"PUR" , tag: ["フリーザ軍" , "変身戦士" , "悪の系譜" , "強大な敵"] } ,
    { id:10 , code:"DBL24-01S" , name:"超サイヤ人ゴッドSS ベジット" , color:"BLU" , tag: ["サイヤ人" , "超サイヤ人ゴッドSS" , "神の気" , "未来" , "合体戦士"] } ,
    { id:11 , code:"DBL26-06S" , name:"ベジータ" , color:"BLU" , tag: ["サイヤ人" , "ベジータ一族"] } ,
    { id:12 , code:"DBL29-04S" , name:"身勝手の極意\"兆\" 孫悟空" , color:"PUR" , tag: ["サイヤ人" , "孫一族" , "神の気" , "宇宙代表"] } ,
    { id:13 , code:"DBL30-01S" , name:"超サイヤ人ゴッドSS ゴジータ" , color:"YEL" , tag: ["サイヤ人" , "超サイヤ人ゴッドSS" , "合体戦士" , "神の気" , "フュージョン"] } ,
    { id:14 , code:"DBL30-03S" , name:"超サイヤ人 ブロリー" , color:"BLU" , tag: ["サイヤ人" , "超サイヤ人" , "強大な敵"] } ,
    { id:15 , code:"DBL31-01S" , name:"超サイヤ人 孫悟飯" , color:"YEL" , tag: ["混血サイヤ人" , "孫一族" , "超サイヤ人" , "未来"] } ,
    { id:16 , code:"DBL32-02S" , name:"魔人ブウ：純粋" , color:"BLU" , tag: ["吸収" , "再生" , "強大な敵"] } ,
    { id:17 , code:"DBL33-02S" , name:"超サイヤ人ロゼ ゴクウブラック" , color:"PUR" , tag:["サイヤ人" , "未来" , "神の気" , "超サイヤ人ロゼ" , "強大な敵"] } ,
    { id:18 , code:"DBL34-01S" , name:"超サイヤ人4 孫悟空" , color:"YEL" , tag: ["サイヤ人" , "孫一族" , "GT" , "超サイヤ人4"] } ,
    { id:19 , code:"DBL35-01S" , name:"超サイヤ人4 ゴジータ" , color:"GRN" , tag: ["サイヤ人" , "超サイヤ人4" , "合体戦士" , "GT" , "フュージョン"] } ,
    { id:20 , code:"DBL35-08S" , name:"半身崩壊 合体ザマス" , color:"RED" , tag: ["神の気" , "未来" , "再生" , "合体戦士" , "ポタラ" , "強大な敵"] } ,
    { id:21 , code:"DBL36-01S" , name:"超サイヤ人 孫悟飯：少年期" , color:"PUR" , tag: ["混血サイヤ人" , "孫一族" , "超サイヤ人"] } ,
    { id:22 , code:"DBL37-02S" , name:"最終形態 フリーザ：フルパワー" , color:"YEL" , tag: ["フリーザ軍" , "変身戦士" , "悪の系譜" , "強大な敵"] } ,
    { id:23 , code:"DB38L-01S" , name:"超サイヤ人ゴッドSS：進化 ベジータ" , color:"YEL" , tag: ["サイヤ人" , "ベジータ一族" , "神の気" , "超サイヤ人ゴッドSS" , "宇宙代表"] } ,
    { id:24 , code:"DBL39-01S" , name:"ベジータ" , color:"RED" , tag: ["フリーザ軍" , "サイヤ人" , "強大な敵" , "ベジータ一族"] } ,
    { id:25 , code:"DBL40-02S" , name:"パーフェクトセル" , color:"PUR" , tag: ["人造人間" , "吸収" , "再生" , "未来" , "強大な敵"] } ,
    { id:26 , code:"DBL41-01S" , name:"超サイヤ人ゴッドSS 孫悟空＆ベジータ" , color:"PUR" , tag: ["サイヤ人" , "神の気" , "超サイヤ人ゴッドSS" , "孫一族" , "ベジータ一族"] } ,
    { id:27 , code:"DBL41-02S" , name:"超サイヤ人 トランクス：青年期" , color:"BLU" , tag: ["混血サイヤ人" , "超サイヤ人" , "未来" , "ベジータ一族" , ",武器持ち"] } ,
    { id:28 , code:"DBL43-01S" , name:"バーダック" , color:"YEL" , tag: ["サイヤ人" ,  "バーダックチーム"] } ,
    { id:29 , code:"DBL44-01S" , name:"ジレン：フルパワー" , color:"PUR" , tag: ["ライバル宇宙" , "第11宇宙" , "強大な敵" , "宇宙代表"] } ,
    { id:30 , code:"DBL46-01S" , name:"人造人間17号＆人造人間18号" , color:"RED" , tag: ["人造人間" , "ガールズ" , "双子" , "未来" , "強大な敵"] } ,
    { id:31 , code:"DBL47-01S" , name:"身勝手の極意 孫悟空" , color:"RED" , tag: ["サイヤ人" , "孫一族" , "神の気" , "宇宙代表"] } ,
    { id:32 , code:"DBL48-01S" , name:"超サイヤ人3 孫悟空" , color:"GRN" , tag: ["サイヤ人" , "超サイヤ人3" , "孫一族"] } ,
    { id:33 , code:"DBL50-01S" , name:"超サイヤ人 トランクス：青年期" , color:"GRN" , tag: ["混血サイヤ人" , "ベジータ一族" , "超サイヤ人" , "未来" , "武器持ち"] } ,
    { id:34 , code:"DBL51-01S" , name:"最終形態 クウラ" , color:"RED" , tag: ["変身戦士" , "悪の系譜" , "強大な敵"] } ,
    { id:35 , code:"DBL52-01S" , name:"ビースト 孫悟飯" , color:"BLU" , tag: ["混血サイヤ人" , "孫一族"] } ,
    { id:36 , code:"DBL53-01S" , name:"超サイヤ人4 孫悟空＆ベジータ" , color:"GRN" , tag: ["サイヤ人" , "GT" , "超サイヤ人4" , "孫一族" , "ベジータ一族"] } ,
    { id:37 , code:"DBL54-03S" , name:"超サイヤ人2＆超サイヤ人ゴッドSS トランクス：青年期＆ベジータ" , color:"YEL" , tag: ["ベジータ一族" , "混血サイヤ人" , "未来" , "超サイヤ人2" , "武器持ち" , "サイヤ人" , "神の気" , "超サイヤ人ゴッドSS"] } ,
    { id:38 , code:"DBL55-01S" , name:"人造人間17号" , color:"BLU" , tag: ["人造人間" , "双子" , "宇宙代表"] } ,
    { id:39 , code:"DBL56-01S" , name:"超サイヤ人ゴッドSS 孫悟空" , color:"GRN" , tag: ["サイヤ人" , "孫一族" , "神の気" , "超サイヤ人ゴッドSS" , "宇宙代表"] } ,
    { id:40 , code:"DBL58-01S" , name:"超サイヤ人3＆超サイヤ人2 孫悟空＆ベジータ" , color:"BLU" , tag: ["サイヤ人" , "超サイヤ人3" , "孫一族" , "超サイヤ人2" , "ベジータ一族" , "あの世の戦士"] } ,
    { id:41 , code:"DBL59-01S" , name:"孫悟空＆最終形態フリーザ" , color:"PUR＆BLU" , tag: ["サイヤ人" , "孫一族" , "宇宙代表" , "フリーザ軍" , "変身戦士" , "悪の系譜" , "あの世の戦士"] } ,
    { id:42 , code:"DBL60-02S" , name:"潜在能力解放 ピッコロ" , color:"GRN" , tag: ["再生" , "融合" , "超戦士" , "ナメック星人" , "変身戦士"] } ,
    { id:43 , code:"DBL60-03S" , name:"ガンマ1号＆ガンマ2号" , color:"YEL" , tag: ["人造人間" , "武器持ち"] } ,
    { id:44 , code:"DBL61-03S" , name:"完全体 セル" , color:"PUR" , tag: ["人造人間" , "吸収" , "再生" , "未来" , "強大な敵"] } ,
    { id:45 , code:"DBL62-04S" , name:"超サイヤ人 孫悟空" , color:"BLU" , tag: ["サイヤ人" , "超サイヤ人" , "孫一族"] } ,
    { id:46 , code:"DBL63-01S" , name:"孫悟空：少年期" , color:"PUR" , tag: ["サイヤ人" , "キッズ" , "孫一族" , "孫一族" , "DB" , "武器持ち"] } ,
    { id:47 , code:"DBL64-02S" , name:"パイクーハン" , color:"GRN" , tag: ["あの世の戦士" , "サイヤ人" , "超サイヤ人" , "合体戦士" , "フュージョン"] } ,
    { id:48 , code:"DBL65-01S" , name:"超サイヤ人ゴッドSS：進化＆超サイヤ人ゴッド界王拳 ベジータ＆孫悟空" , color:"GRN" , tag: ["サイヤ人" , "ベジータ一族" , "神の気" , "超サイヤ人ゴッドSS" , "宇宙代表" , "孫一族"] } ,
    { id:49 , code:"DBL65-02S" , name:"アルティメット孫悟飯" , color:"RED" , tag: ["混血サイヤ人" , "孫一族"] } ,
    { id:50 , code:"DBL66-01S" , name:"孫悟空＆バーダック" , color:"BLU＆GRN" , tag: ["サイヤ人" , "孫一族" , "バーダックチーム"] } ,
    { id:51 , code:"DBL67-01S" , name:"孫悟空" , color:"BLU" , tag: ["サイヤ人" , "孫一族" , "GT" , "キッズ"] } ,
    { id:52 , code:"DBL67-05S" , name:"超17号" , color:"RED" , tag: ["人造人間" , "融合" , "合体戦士" , "GT" , "強大な敵"] } ,
    { id:53 , code:"DBL68-01S" , name:"超ベジータ" , color:"RED" , tag: ["サイヤ人" , "ベジータ一族" , "超サイヤ人"] } ,
    { id:54 , code:"DBL69-01S" , name:"スーパーベビー2" , color:"YEL" , tag: ["融合" , "GT" , "変身戦士" , "再生" , "サイヤ人" , "強大な敵"] } ,
    { id:55 , code:"DBL70-03S" , name:"ナッパ" , color:"PUR" , tag: ["フリーザ軍" , "サイヤ人" , "ベジータ一族" , "強大な敵"] } ,
    { id:56 , code:"DBL71-01S" , name:"ベジータ＆孫悟空" , color:"BLU" , tag: ["サイヤ人" , "ベジータ一族" , "あの世の戦士" , "孫一族" , "超サイヤ人" , "合体戦士" , "ポタラ"] } ,
    { id:57 , code:"DBL71-02S" , name:"超サイヤ人ゴッドSS 孫悟空＆ベジータ" , color:"YEL" , tag: ["サイヤ人" , "孫一族" , "神の気" , "超サイヤ人ゴッドSS" , "ベジータ一族" , "合体戦士" , "フュージョン"] } ,
    { id:58 , code:"DBL72-01S" , name:"超サイヤ人ゴッド 孫悟空" , color:"GRN" , tag: ["サイヤ人" , "孫一族" , "神の気" , "超サイヤ人ゴッド"] } ,
    { id:59 , code:"DBL72-02S" , name:"アルティメット孫悟飯" , color:"PUR" , tag: ["混血サイヤ人" , "孫一族"] } ,
    { id:60 , code:"DBL73-02S" , name:"超一星龍" , color:"GRN" , tag: ["邪悪龍" , "GT" , "再生" , "吸収" , "合体戦士" , "強大な敵"] } ,
    { id:61 , code:"DBL74-03S" , name:"超サイヤ人 ブロリー" , color:"RED" , tag: ["サイヤ人" , "超サイヤ人" , "強大な敵"] } ,
    { id:62 , code:"DBL75-01S" , name:"孫悟空" , color:"YEL" , tag: ["サイヤ人" , "孫一族"] } ,
    { id:63 , code:"DBL76-02S" , name:"超サイヤ人3 ゴテンクス" , color:"RED" , tag: ["混血サイヤ人" , "超サイヤ人3" , "合体戦士" , "フュージョン" , "キッズ"] } ,
    { id:64 , code:"DBL77-03S" , name:"ベジット" , color:"GRN" , tag: ["サイヤ人" , "未来" , "合体戦士" , "ポタラ"] } ,
    { id:65 , code:"DBL77-05S" , name:"ゴクウブラック" , color:"YEL" , tag: ["サイヤ人" , "未来" , "強大な敵"] } ,
    { id:66 , code:"DBL78-01S" , name:"超サイヤ人 孫悟空(ミニ)" , color:"RED" , tag: ["サイヤ人" , "超サイヤ人" , "孫一族" , "DAIMA" , "武器持ち" , "キッズ"] } ,
    { id:67 , code:"DBL78-02S" , name:"超サイヤ人2 孫悟空" , color:"GRN" , tag: ["サイヤ人" , "超サイヤ人2" , "孫一族" , "あの世の戦士"] } ,
    { id:68 , code:"DBL79-01S" , name:"超サイヤ人孫悟飯＆トランクス：少年期" , color:"BLU" , tag: ["混血サイヤ人" , "孫一族" , "超サイヤ人" , "未来" , "ベジータ一族"] } ,
    { id:69 , code:"DBL79-04S" , name:"合体ザマス" , color:"RED" , tag: ["神の気" , "未来" , "再生" , "合体戦士" , "ポタラ" , "強大な敵"] } ,
    { id:70 , code:"DBL80-01S" , name:"超サイヤ人 孫悟空" , color:"PUR" , tag: ["サイヤ人" , "超サイヤ人" , "孫一族"] } ,
    { id:71 , code:"DBL81-02S" , name:"超サイヤ人3 ベジータ" , color:"GRN" , tag: ["サイヤ人" , "ベジータ一族" , "超サイヤ人3" , "DAIMA"] } ,
    { id:72 , code:"DBL81-04S" , name:"超サイヤ人4 孫悟空" , color:"BLU" , tag: ["サイヤ人" , "孫一族" , "超サイヤ人4" , "DAIMA"] } ,
    { id:73 , code:"DBL82-01S" , name:"ピッコロ大魔王" , color:"PUR" , tag: ["再生" , "ナメック星人" , "強大な敵" , "DB"] } ,
    { id:74 , code:"DBL82-03S" , name:"孫悟空：少年期" , color:"YEL" , tag: ["サイヤ人" , "キッズ" , "孫一族" , "DB" , "武器持ち"] } ,
    { id:75 , code:"DBL83-01S" , name:"身勝手の極\"兆\" 孫悟空" , color:"BLU" , tag: ["サイヤ人" , "孫一族" , "神の気" , "宇宙代表"] } ,
    { id:76 , code:"DBL83-02S" , name:"超サイヤ人ゴッドSS ベジータ" , color:"PUR" , tag: ["サイヤ人" , "ベジータ一族" , "神の気" , "超サイヤ人ゴッドSS" , "宇宙代表"] } ,
    { id:77 , code:"DBL84-01S" , name:"孫悟空" , color:"RED" , tag: ["サイヤ人" , "孫一族"] } ,
    { id:78 , code:"DBL84-03S" , name:"ベジータ" , color:"GRN" , tag: ["フリーザ軍" , "サイヤ人" , "強大な敵" , "ベジータ一族"] } ,
    { id:79 , code:"DBL85-04S" , name:"超サイヤ人2 ケフラ" , color:"GRN" , tag: ["サイヤ人" , "超サイヤ人2" , "ガールズ" , "合体戦士" , "ポタラ" , "第6宇宙" , "ライバル宇宙" , "宇宙代表"] } ,
    { id:80 , code:"DBL86-02S" , name:"メタルクウラ" , color:"PUR" , tag: ["悪の系譜" , "融合" , "再生" , "強大な敵"] } ,
    { id:81 , code:"DBL87-01S" , name:"超サイヤ人3 孫悟空" , color:"PUR" , tag: ["サイヤ人" , "超サイヤ人3" , "孫一族" , "GT" , "キッズ"] } ,
    { id:82 , code:"DBL87-02S" , name:"人造人間13号" , color:"BLU" , tag: ["人造人間" , "強大な敵"] } ,
    { id:83 , code:"DBL89-01S" , name:"孫悟空＆ベジータ" , color:"GRN" , tag: ["サイヤ人" , "孫一族" , "あの世の戦士" , "ベジータ一族" , "超サイヤ人" , "合体戦士" , "フュージョン"] } ,
    { id:84 , code:"DBL89-03S" , name:"スーパージャネンバ" , color:"YEL" , tag: ["変身戦士" , "再生" , "強大な敵" , "武器持ち"] } ,
    { id:85 , code:"DBL90-01S" , name:"超サイヤ人ゴッド孫悟空＆ヒット" , color:"RED" , tag: ["サイヤ人" , "孫一族" , "神の気" , "超サイヤ人ゴッド" , "宇宙代表" , "第6宇宙" , "ライバル宇宙"] } ,
    { id:86 , code:"DBL90-02S" , name:"超サイヤ人2 孫悟飯：少年期" , color:"BLU" , tag: ["混血サイヤ人" , "孫一族" , "超サイヤ人2"] } ,
] ;

// --- 一覧 ---
app.get("/character", (req, res) => {
  res.render('chara', {
    data: character,
    title: "キャラクター一覧",
    showBackButton: false
  } );
});

// ---追加1---
app.get("/character/create", (req, res) => {
  res.render('chara_add', {
    title: "新規登録"
  });
});

// --- 詳細 ---
app.get("/character/:id", (req, res) => {
  const id = req.params.id;
  const detail = character.find(a => a.id == id);
  res.render('chara_detail', {
    id: id,
    data: detail,
    title: "キャラクター詳細",
    showBackButton: true
  } );
});

// ---削除---
app.get("/character/delete/:id", (req, res) => {
  const id = req.params.id;
  const target = character.find(a => a.id == id);

  if (!target) {
    return res.redirect('/character');
  }

  // ---削除の確認---
  res.render('chara_delete' , {
    data: target,
    title: "削除の確認"
  });
});

// ---削除の実行---
app.post("/character/delete/:id" , (req, res) => {
  const id = req.params.id;
  const index = character.findIndex(a => a.id == id);

  if (index !== 1) {
    character.splice( index, 1 );
    console.log("削除完了: ID " + id);
  }
  res.redirect('/character' );
});

// ---追加2---
app.post("/character", uplood.single('image'), (req, res) => {
  const ID = character.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const color = req.body.color;
  const Tag = req.body.tag ? req.body.tag.split(',') : [];
  character.push ( {
    id: ID,
    code: code,
    name: name,
    color: color,
    tag: Tag
  } );

  if (req.file) {
    const path = req.file.path;
    const new_name = 'public/img/' + ID + '.jpeg';

    fs.rename(path, new_name, (err) => {
      if (err) console.log("画像保存エラー: " + err);
    });
  }

  console.log( "データを追加: ID " + ID );
  res.redirect('/character');
});

// --- 編集 ---
app.get("/character/edit/:id", (req, res) => {
  const id = req.params.id;
  const detail = character.find(a => a.id == id);
  res.render('chara_edit', {
    id: id,
    data: detail,
    title: "データ編集",
  } );
});

// --- 登録 ---
app.post("/character/update/:id", uplood.single('image'), (req, res) => {
  const id = req.params.id;
  const index = character.findIndex(a => a.id == id)

  if (index !== -1) {
    character[index].id = req.body.id;
    character[index].code = req.body.code;
    character[index].name = req.body.name;
    character[index].color = req.body.color;

    if (req.body.tag && typeof req.body.tag === 'string') {
      character[index].tag = req.body.tag.split(',');
    } else {
      character[index].tag = req.body.tag;
    }

    if (req.file) {
      //アップロードされたファイル
      const new_file = req.file.path;
      //変更後のファイル名
      const file_name = 'public/img/' + id + '.jpeg';
      //ファイル名の変更
      fs.rename(new_file, file_name, (err) => {
        if (err) console.log ("画像保存エラー: " + err);
      });
    }
    console.log( "データを更新:" , character[index] );
  }
  
  res.redirect('/character/' + id );
});

// --- 属性検索 ---
app.get("/color/:name", (req, res) => {
  const colorName = req.params.name;
  const filteredData = character.filter(c => c.color === colorName);
  res.render('chara', {
    data: filteredData,
    title: `属性: ${colorName} の一覧`,
  showBackButton: true
  });
});

// --- タグ検索 ---
app.get("/tag/:name", (req, res) => {
  const tagName = req.params.name;
  const filteredData = character.filter(c => c.tag.includes(tagName));
  res.render('chara', {
    data: filteredData,
    title: `タグ: ${tagName} の一覧`,
  showBackButton: true
  });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));