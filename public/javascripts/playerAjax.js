let request = new XMLHttpRequest()

//リクエストの状態が変化したときの挙動を定義
request.onreadystatechange = function(){
    // var result = document.getElementById('result')
    if(request.readyState == 4){ //通信完了時
        if(request.status == 200){ //通信の成功時
            // result.innerHTML = request.responseText;
            console.log(request.responseText)
        }
    }else{
        // result.innerHTML = "データ取得中...";
        console.log('データ取得中...')
    }
}

//oninput時の挙動（リクエストを投げる）ための関数
function makeRequest(){

    //入力された情報を取得
    // searchkey = document.getElementById("searchkeyholder").value;

    //リクエスト作成
    //引数：HTTPメソッド, URL, 非同期通信をするかどうか
    request.open('GET', ('/player/api'), true)

    //リクエストを送信
    //引数：GETはパラメータをURLに含めているので引数はnull。POSTの場合はリクエスト内容
    request.send(null);
}