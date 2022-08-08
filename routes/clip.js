var express = require('express');
var router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');

router.get('/', function(req, res, next) {
    res.render('clip', { });
});

router.post('/addData', function(req, res){
    let musicData = req.body
    console.log(musicData[0].movie)
    addData(musicData)

    res.send('data ok')
})

async function addData (musicData){
    console.log('spreadsheet')
    // 認証
    const doc = new GoogleSpreadsheet('1aYAJLbqEZmn3s7G0tPrhF7jUQg7ib70Oaa0qU-t0NG8')
    const cred = require('./client_secret.json')
    await doc.useServiceAccountAuth( cred );
    // sheetの取得
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = await doc.addSheet({headerValues:['id', 'movie', 'name', 'title', 'start', 'end'] , title: musicData[0].movie})
    sheet.addRows(musicData)
}



module.exports = router;
