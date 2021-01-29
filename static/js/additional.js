timer1 = "";
/*時間を作る関数*/
function sleep(waitMsec) {
  var startMsec = new Date();
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

/*自動スクロールのスクリプト*/
var $scrollY = 0;
function autoScroll() {
  const spinner = document.getElementById('loading');
  var $sampleBox = document.getElementById("scroll-box");
  $sampleBox.scrollTop = ++$scrollY;
  $sampleBox.scrollTop = $sampleBox.scrollHeight;
  if ($scrollY < $sampleBox.scrollHeight - $sampleBox.clientHeight) {
    $scrolly = $sampleBox.scrollHeight - $sampleBox.clientHeight;
    spinner.classList.add('loaded');
    return;
    setTimeout("autoScroll()", 1);
  } else if ($scrollY == $sampleBox.scrollHeight - $sampleBox.clientHeight) {
    spinner.classList.add('loaded');
    return;
  } else {
    $scrollY = 0;
    $sampleBox.scrollTop = 0;
    setTimeout("autoScroll()", 1);
  }
}

function scrollToTop() {
  var $sampleBox = document.getElementById("scroll-box2");
  $sampleBox.scrollTo(0, 0);
 }

function autoScroll2() {
  //const spinner = document.getElementById('loading');
  var $sampleBox = document.getElementById("noticelist");
  $sampleBox.scrollTop = ++$scrollY;
  $sampleBox.scrollTop = $sampleBox.scrollHeight;
  if ($scrollY < $sampleBox.scrollHeight - $sampleBox.clientHeight) {
    $scrolly = $sampleBox.scrollHeight - $sampleBox.clientHeight;
    //spinner.classList.add('loaded');
    return;
    setTimeout("autoScroll2()", 1);
  } else if ($scrollY == $sampleBox.scrollHeight - $sampleBox.clientHeight) {
    spinner.classList.add('loaded');
    return;
  } else {
    $scrollY = 0;
    $sampleBox.scrollTop = 0;
    setTimeout("autoScroll2()", 1);
  }
}
/*
function autoScroll(){
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  var speed = 1; //時間あたりに移動するpx量です。デフォルトでは1pxにしていますが、自由に変えてください
  var interval = 100; //移動する間隔です。デフォルトでは0.1秒おきにしていますが、自由に変えてください
  var scrollTop = document.body.scrollTop;
  setInterval(function() {
      var scroll = scrollTop + speed;
      scrollTop.scrollBy(0, scroll)
  },interval);
}
*/

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

/**/
function messagenoticecount(){
  var postdata2 = {
    "messagenoticecount": "OK"
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/messagenoticecount.php",
    data: postdata2,
    //処理が成功したら
    success: function (data) {
      if (data==0){
        data = "";
      }else{
        //data = String(data);
        data = data.replace(/\r?\n/g,"");
      }
      var messagenoticenum = document.getElementById("messagenoticenum");
      messagenoticenum.innerText =data;
    },
    error: function () {
      alert("error");
    }
  });
  return false;
}

function messagenoticecount2(){
  var messagenoticenum = document.getElementById("messagenoticenum2");
  messagenoticenum.innerText ="";
}

/*メッセージ一覧を表示する関数*/
function noticelist() {
  var postdata2 = {
    "noticelist": "OK"
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/noticelist.php",
    data: postdata2,
    //処理が成功したら
    success: function (data) {
      var myh2 = document.getElementById("noticelist");
      myh2.innerHTML = data;
      autoScroll2();
      messagenoticecount2()

    },
    error: function () {
      alert("error");
    }
  });
  return false;
}


/*メッセージ一覧を表示する関数*/
function messagelist() {
  var postdata2 = {
    "messagelist": "OK"
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/messagelist.php",
    data: postdata2,
    //処理が成功したら
    success: function (data) {
      var myh2 = document.getElementById("messagelist");
      myh2.innerHTML = data;

    },
    error: function () {
      alert("error");
    }
  });
  return false;
}

/*コメット処理バージョン　重いので保留
function messagedisplay2(internshipID,internshipname) {
  var postdata = {
    "getmessage": internshipID
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/getchatmessage.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      //var respons = JSON.parse(data);
      //console.log(respons);

      var myh2 = document.getElementById("scroll-box");
      myh2.innerHTML = data;
      var myh3 = document.getElementById("headersenduser");
      myh3.innerHTML = internshipname;
      //メッセージの数をローカルストレージに保存
      //let messagecount = document.getElementById("messagecount").className;
      //localStorage.setItem(senduser, messagecount);
      autoScroll();
      messagenoticecount()
      //サーバー待機
      $.ajax({
        //POST通信
        type: "POST",
        //ここでデータの送信先URLを指定します。
        url: "managephp/getchatnewmessage.php",
        data: postdata,
        //処理が成功したら
        success: function (data) {
          console.log(data);
          //messagedisplay2(internshipID,internshipname)
          var myh2 = document.getElementById("scroll-box");
          myh2.innerHTML = data;
          var myh3 = document.getElementById("headersenduser");
          myh3.innerHTML = internshipname;
        },
        error: function () {
          alert("error");
        }
      });

      //チャットの入力欄を複数行に自動調整  ここに書かないとajax通信後に動作しない
      $(function () {
        var $textarea = $('#textmessage');
        var lineHeight = parseInt($textarea.css('lineHeight'));
        $textarea.on('input', function (e) {
          var lines = ($(this).val() + '\n').match(/\n/g).length;
          $(this).height(lineHeight * lines);
        });
      });
    },
    error: function () {
      alert("error");
    }
  });
  return false;
}
*/
/*メッセージリストからメッセージを表示する関数*/

function messagedisplay2(internshipID,internshipname) {
  var postdata = {
    "getmessage": internshipID
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/getchatmessage.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      //var respons = JSON.parse(data);
      var myh2 = document.getElementById("scroll-box");
      myh2.innerHTML = data;
      var myh3 = document.getElementById("headersenduser");
      myh3.innerHTML = internshipname;
      //メッセージの数をローカルストレージに保存
      //let messagecount = document.getElementById("messagecount").className;
      //localStorage.setItem(senduser, messagecount);
      autoScroll();
      messagenoticecount()
      //チャットの入力欄を複数行に自動調整  ここに書かないとajax通信後に動作しない
      $(function () {
        var $textarea = $('#textmessage');
        var lineHeight = parseInt($textarea.css('lineHeight'));
        $textarea.on('input', function (e) {
          var lines = ($(this).val() + '\n').match(/\n/g).length;
          $(this).height(lineHeight * lines);
        });
      });
    },
    error: function () {
      alert("error");
    }
  });
  return false;
}


/*メッセージを表示する関数*/
function messagedisplay(internshipID) {
  var postdata = {
    "getmessage": internshipID
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/getchatmessage.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      var myh2 = document.getElementById("scroll-box");
      myh2.innerHTML = data;

      //メッセージの数をローカルストレージに保存
      //let messagecount = document.getElementById("messagecount").className;
      //localStorage.setItem(senduser, messagecount);
      autoScroll();
      //チャットの入力欄を複数行に自動調整  ここに書かないとajax通信後に動作しない
      $(function () {
        var $textarea = $('#textmessage');
        var lineHeight = parseInt($textarea.css('lineHeight'));
        $textarea.on('input', function (e) {
          var lines = ($(this).val() + '\n').match(/\n/g).length;
          $(this).height(lineHeight * lines);
        });
      });

    },
    error: function () {
      alert("error");
    }
  });
  return false;
}


/*メッセージを追加する関数*/
function addmessageclick() {
  let textmessage = document.getElementById("textmessage").value;
  if (textmessage.length == 0) {
    return;
  }
  let internshipID = document.getElementById("sendusername1").className;
  var postdata = {
    "addchattext": textmessage,
    "internshipID": internshipID
  };
  //処理
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/addchattext.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      messagedisplay(internshipID);
      //sendbtn.classList.remove('text-primary');
      //sendbtn.classList.add('grey-text');
    },
    error: function () {
      alert("error");
    }
  });
  var myh3 = document.getElementById("inputarea");
  myh3.innerHTML = `<!-- テキストエリア -->
  <!--Textarea with icon prefix-->
  <textarea id="textmessage" onInput="changesendbtncolor()" class="md-textarea form-control col-md-10 col-9 mb-3 float-left" rows="1" style="max-height:170px;border-radius:2vw;resize: none;"></textarea>
  <a onclick="addmessageclick()" class="float-right"><i class="fas fa-paper-plane fa-2x col-md-2 col-3 mt-1 grey-text mr-3" id="sendicon"></i></a>
  `;
  return false;
}


/*メッセージを消去する関数*/
function deletemessage(classdate) {
  let senduser = document.getElementById("sendusername1").className;
  var postdata = {
    "classdate": classdate
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/deletemessage.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      messagedisplay(senduser);
    },
    error: function () {
      alert("error");
    }
  });
  return false;
}

//メッセージを更新する関数
function messagerenew() {
  let senduser = document.getElementById("sendusername1").className;
  messagedisplay(senduser);
  return;
}

/*ブックマーク一覧を表示する関数*/
function bookmarklist() {
  var postdata2 = {
    "bookmarklist": "OK"
  };
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/bookmarklist.php",
    data: postdata2,
    //処理が成功したら
    success: function (data) {
      var myh2 = document.getElementById("bookmarklist");
      myh2.innerHTML = data;
    },
    error: function () {
      alert("error2");
    }
  });
  return false;
}


/*ブックマークする関数*/
function bookmark(param,name){
  var postdata ={"param":param};
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/bookmark.php",
    data:postdata,
    //処理が成功したら
    success:function(data) {
      alert(name+"をブックマークに追加しました。")
      location.reload()
    /*
    const bookmarkbtn = document.getElementById('bookmarkbtn');
    bookmarkbtn.style.backgroundColor="#fff";
    */
  },error:function(){
      alert("error");
  }
});
//setTimeout( "messagedisplay()", 3000 );
return false;
}

/*ブックマークを消去する関数*/
function deletebookmark(param,name){

  var postdata ={"param":param};
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/deletebookmark.php",
    data:postdata,
    //処理が成功したら
    success:function(data) {
    alert(name+"をブックマークから消去しました。")
    location.reload()
  },error:function(){
    alert("error");
  }
});
//setTimeout( "messagedisplay()", 3000 );
return false;
}


/*申し込みする関数*/
function apply() {
  //let textmessage = document.getElementById("applyinfo").textContent;
  let internshipname = document.getElementById("internshipname").textContent;
  let internshipID = document.getElementById("internshipID").textContent;
  let textmessage = internshipname + "に申し込みが完了しました。メッセージがくるまでしばらくお待ちください。";
  var postdata = {
    "applydata": "applydata",
    "internshipID": internshipID,
    "textmessage": textmessage
  }
  /*
  var postdata ={"applydata":"applydata",
  "name":name,
  "mail":mail,
  "phonenumber":phonenumber,
  "university":university,
  "undergraduate":undergraduate,
  "department":department,
  "graduateyear":graduateyear,
  "schoolyear":schoolyear,
  "selfappeal":selfappeal,
  "areaofinterest":areaofinterest,
  "clubinhighschool":clubinhighschool,
  "currentactivity":currentactivity
  };
  */
  //処理
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/apply.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      console.log(data);
      if (data=="OK"){
        alert("申し込みが完了しました。")
        messagenoticecount()
      }else if (data=="NOT"){
        alert("既に申し込みは完了されています。")
      }
    },
    error: function () {
      alert("error");
    }
  });
  return false;
}

//モーダルにデータを受け渡す関数
function applyclick(internshipID,internshipname) {
  $('#applymodal').on('show.bs.modal', function (event) {
    //var button = $(event.relatedTarget); //モーダルを呼び出すときに使われたボタンを取得
    //var internshipID = button.data('internshipid'); //data-whatever の値を取得
    //var internshipname = button.data('internshipname'); //data-whatever の値を取得
    //Ajaxの処理はここに
    var modal = $(this); //モーダルを取得
    modal.find('.internshipname').text(internshipname); //モーダルのタイトルに値を表示
    modal.find('.internshipID').text(internshipID);
  })
}

/*プロフィールを変更する関数*/
function profilechangeclick() {
  let name = document.getElementById("name").value;
  //let mail = document.getElementById("mail").value;
  let phonenumber = document.getElementById("phonenumber").value;
  let university = document.getElementById("university").value;
  let undergraduate = document.getElementById("undergraduate").value;
  let department = document.getElementById("department").value;
  let graduateyear = document.getElementById("graduateyear").value;
  let schoolyear = document.getElementById("schoolyear").value;
  let selfappeal = document.getElementById("selfappeal").value;
  let areaofinterest = document.getElementById("areaofinterest").value;
  let clubinhighschool = document.getElementById("clubinhighschool").value;
  let currentactivity = document.getElementById("currentactivity").value;
  var postdata = {
    "profiledata": "profiledata",
    "name": name,
    //"mail":mail,
    "phonenumber": phonenumber,
    "university": university,
    "undergraduate": undergraduate,
    "department": department,
    "graduateyear": graduateyear,
    "schoolyear": schoolyear,
    "selfappeal": selfappeal,
    "areaofinterest": areaofinterest,
    "clubinhighschool": clubinhighschool,
    "currentactivity": currentactivity
  };
  //処理
  $.ajax({
    //POST通信
    type: "POST",
    //ここでデータの送信先URLを指定します。
    url: "managephp/profilechange.php",
    data: postdata,
    //処理が成功したら
    success: function (data) {
      console.log(data);
    },
    error: function () {
      alert("error");
    }
  });
  return false;
}

/*企業の募集一覧を表示する関数*/
function enterprisematterlist(param){
  var postdata ={"param2":param};
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
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



//PHP Comet 処理重いので保留
/*
function messagedisplay2(){
var postdata ={"getmessage":"OK"};
//const spinner = document.getElementById('loading');
//spinner.classList.add('loaded');
$.ajax({
//POST通信
type: "POST",
//ここでデータの送信先URLを指定します。
url: "chat.php",
data:postdata,
//処理が成功したら
success:function(data) {
  var myh2 = document.getElementById("scroll-box");
  //alert(data);
  myh2.innerHTML = data;

autoScroll();
//setTimeout("autoScroll()", 100 );

},error:function(){
alert("error");
}
});
console.log("OK2");
//setTimeout("messagedisplay2()", 100 );
//setTimeout("messagedisplay2()", 100 );

//setTimeout( "messagedisplay()", 3000 );
return;
}
*/
