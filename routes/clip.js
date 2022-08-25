var express = require('express');
var router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');

const password = '10110000101001010101100111100100001001001000101'

router.get('/', function(req, res, next) {
    res.render('clip', { });
});


router.post('/addData', function(req, res){
    let musicData = req.body
    console.log(musicData[0])
    // 合言葉があってるときは本データに追加、間違ってるときは新しいシートに追加
    // あいことばは後で抜く
    if (musicData[0].pass == password){
        addData(1, musicData) // data追加
        console.log('Auth Success : ' + musicData.length)
        // res.send('Auth Success')
        res.json({auth: true, message: 'MusicListに保存しました。'})
    } else {
        addData(0, musicData) // data追加
        console.log('Auth failure')
        // res.send('Auth failure')
        res.json({auth: false, message: '合言葉が入力されていないか間違っています。新たなシートに保存しました。'})
    }
})

async function addData (auth, musicData){
    // 合言葉を抜く
    await musicData.shift()
    console.log('add data No.' + auth)
    // 認証
    const doc = new GoogleSpreadsheet('1aYAJLbqEZmn3s7G0tPrhF7jUQg7ib70Oaa0qU-t0NG8')
    const cred = require('./client_secret.json')
    await doc.useServiceAccountAuth( cred );
    // sheetの
    await doc.loadInfo(); // loads document properties and worksheets

    if (auth == 1){
        // データの追加
        const sheet = await doc.sheetsById['499681151']
        console.log(sheet.title)
        await sheet.addRows(musicData, {raw: true ,insert: true })
        // console.log(row);
    } else if (auth == 0){
        // 本物のと別に保存
        // 過去に作ってたら削除
        if (doc.sheetsByTitle[musicData[0].movie] != undefined) {
            console.log('___delete___')
            await doc.sheetsByTitle[musicData[0].movie].delete()
        }
        const sheet = await doc.addSheet({headerValues:['movie', 'name', 'title', 'start', 'end'] , title: musicData[0].movie})
        await sheet.addRows(musicData)
        // console.log(row);
    }
}

// addrows aku


module.exports = router;
