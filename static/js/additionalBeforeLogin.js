//javascriptでわざとロードを遅くする処理（ローディング画面を見るため）
// ビジーwaitを使う方法
function sleep(waitMsec) {
  var startMsec = new Date();
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}
//sleep(5000);

function orderchange(pattern) {
  if (pattern == "new"){
    var postdata = {
      "new"  : pattern
    };
  }else if (pattern == "popular"){
    var postdata = {
      "popular"  : pattern
    };
  }else{
    var postdata = {
      "first"  : pattern
    };
  }
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/getinternshipdata.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      var myh2 = document.getElementById("intershipdisplay");
      myh2.innerHTML = data;
    },
    error: function () {
      alert("error2");
    }
  });
  return false;
}

function applyclick(){
  $('#modalLoginForm').modal();
  var myh4 = document.getElementById("loginmodalmessage");
  myh4.innerHTML = "申し込みには登録（ログイン）が必要です"
}

/*企業の募集一覧を表示する関数*/
function enterprisematterlist(param){
  var postdata ={"param2":param};
  //const spinner = document.getElementById('loading');
  //spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/enterprisematter.php",
    data:postdata,
    //処理が成功したら
    success:function(data) {
      var myh2 = document.getElementById("enterprisematterlist");
      myh2.innerHTML = data;
  },error:function(){
    alert("error");
  }
});
return false;
}
