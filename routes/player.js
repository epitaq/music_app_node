var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('player', { });
});

router.get('/api', function(req, res, next){
    res.json(MusicData)
})

let MusicData = [];
(async function() {
    // 認証
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet('1aYAJLbqEZmn3s7G0tPrhF7jUQg7ib70Oaa0qU-t0NG8')
    const cred = require('./client_secret.json')
    await doc.useServiceAccountAuth( cred );
    // sheetの取得
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title)
    const rows = await sheet.getRows(); // can pass in { limit, offset }
    // データをJSON形式に
    for (i in rows){
        let row = rows[i]
        MusicData.push({id: row.id, movie: row.movie, name: row.name, title: row.title, start: row.start, end: row.end})
    }
    console.log(MusicData[0])
}());

module.exports = router;
