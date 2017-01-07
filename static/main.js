/**
 * Created by miaoyicheng on 2017/1/6.
 */

window.onload = function () {
  var index = 0,
      timer;
  $('#set').on('click', function () {
    $('.set-wrap').toggleClass('hidden-header')
  });

  // 清空所有设置
  $('#clear').on('click', function () {
    $('#music-content-wrap').html('')
    $('#fileElem').val('')
    $('#fileDis').val('')
    $('.append-input').remove()
    $('.set-wrap').removeClass('hidden-header')
    window.clearTimeout(timer)
    index = 0
  });
  //开始
  $('#start').on('click', function (e) {
    e.stopPropagation()
    if ( $('.append-input').length === 0) {
      alert('没有设置任何时间点')
    } else {
      $('.set-wrap').addClass('hidden-header')
      $('.set-btn').hide()
      $('.append-input').hide()
      index = 0
      window.clearTimeout(timer)
      handleShowBtn()
      $('body').animate({
        scrollTop: '0px'
      }, 800)
      startScroll()
    }
  });

  //点击选择文件按钮的事件
  $('#choose-files').on('click', function () {
    var el = document.getElementById("fileElem");
    if (el) {
      el.click();
    }
  })
  //监听键盘事件
  $('body').on('keydown',function(e){
    showBtn()
  });

  $('#fileElem').on('change', function () {
    var d = document.getElementById("music-content-wrap");
    var files = this.files
    if (!files.length) {
      d.innerHTML = ''
      alert('没有选择任何图片！')
    } else {
      var list = document.createElement("ul");
      d.appendChild(list);
      for (var i=0; i < files.length; i++) {
        var li = document.createElement("li");
        list.appendChild(li);

        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(files[i]);;
        img.onload = function() {
          window.URL.revokeObjectURL(this.src);
        }
        li.appendChild(img);

      }
    }
  })
  //给页面绑定添加input框的事件
  function handleAppendInput () {
    $('#music-content-wrap').off().on('click', function (e) {
      appendInput (e)
    });
  }
  handleAppendInput()
  //给页面绑定显示功能按钮的事件
  function handleShowBtn () {
    $('#music-content-wrap').off().on('click', function (e) {
      showBtn()
    })
  }
  //添加input输入框
  function appendInput (e) {
    $('body').append("<input class='append-input' placeholder='输入到该位置时间' style='top:"+ (e.pageY -20) +"px' data-position='"+ e.pageY +"'>")
  }
  //点击页面功能按钮出现
  function showBtn () {
    $('.set-btn').show()
    $('.append-input').show()
    handleAppendInput()
  }

  //页面滚动时执行
  function startScroll () {
    var timeList = [] //需要滚动时间和位置的队列
    for (var i = 0,len=$('.append-input').length; i<len;i++) {
      if ($($('.append-input')[i]).val() !== '') {
        timeList.push({
          time: $($('.append-input')[i]).val(),
          position: $('.append-input')[i].dataset.position
        })
      }
    }
    function changePosition () {
      index++
      if (index === timeList[0].time - 0) {
        // $('body').scrollTop(timeList[0].position)
        $('body').animate({
          scrollTop: timeList[0].position + 'px'
        }, 800)
        if(timeList.length > 1) {
          timeList.shift()
        }
        console.log(timeList)
      }
      console.log(index)
      timer = setTimeout(function(){changePosition()}, 1000)
    }
    changePosition()
    console.log(timeList)
  }

}
