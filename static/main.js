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
      $('body').animate({
        scrollTop: '0px'
      }, 800)
      startScroll()
    }
  });

  $('#choose-files').on('click', function () {
    var el = document.getElementById("fileElem");
    if (el) {
      el.click();
    }
  })


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

  $('#music-content-wrap').on('click', function (e) {
    $('.set-btn').show()
    $('body').append("<input class='append-input' placeholder='输入到该位置时间' style='top:"+ (e.pageY -20) +"px' data-position='"+ e.pageY +"'>")
  });

  $('#music-content-wrap').mousemove(function(e) {
    var xx=e.pageX;
    var yy=e.pageY;
    $('#aaa').text(xx + '---' + yy);
  });

  function startScroll () {
    var timeList = [] //需要滚动时间和位置的队列
    for (var i = 0,len=$('.append-input').length; i<len;i++) {
      timeList.push({
        time: $($('.append-input')[i]).val(),
        position: $('.append-input')[i].dataset.position
      })
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
