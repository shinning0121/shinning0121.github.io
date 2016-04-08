window.onload = function () {
    var text = document.getElementById("number-input");
    var leftIn = document.getElementById("left-in");
    var leftOut = document.getElementById("left-out");
    var rightIn = document.getElementById("right-in");
    var rightOut = document.getElementById("right-out");
    var display = document.getElementById("result");
    var reset = document.getElementById("reset");
    var sort = document.getElementById("sort");
    var random = document.getElementById("random");
    var data = [];
    var dataset = [];
    function addEvent(element, type, handler) {
        if (element.addEventListener) {  //兼容测试，非ie有这个属性
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {  //测试当前浏览器是否有这个属性
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;    //没有则添加事件
        }
    }
    function render(data) {
      display.innerHTML = "";
      for (var i = 0; i < data.length; i++) {
        color = 'rgb('+parseInt(256*Math.random())+','+parseInt(256*Math.random())+','+parseInt(256*Math.random())+')';
        display.innerHTML += "<div style = 'background-color:" + color + "; margin:0 1px; width: 100px;" +
          "height:" + data[i] + "px;' title =" + ("数字：" + data[i]) + "></div>";
      }
    }
    function validinput(value) {
    	var number = /^\d+$/;
    	if (!number.test(value)) {
            return false;
        } else {
            if (parseInt(value) >= 10 && parseInt(value) <= 100) {
                return true;
            } else {
                return false;
            }
        }
    }
    function bubblesort(array) {
        dataset = [];
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    dataset.push(JSON.parse(JSON.stringify(array)));
                }
            }     
        }
        return array;
    } 
    addEvent(leftIn, "click", function () {
        if (data.length >= 60) {
            alert("输入的数字不能超过60个！");
            return;
        }
        if (!validinput(text.value)) {
        	alert("输入不合法，请输入10-100间的数字！");
        } else {
            data.unshift(parseInt(text.value)); //数组头部插入
            render(data);
        }
    });
    addEvent(leftOut, "click", function () {
        if (data.length != 0) {
            data.shift();  //数组头部删除
            render(data);
        } else {
            alert("队列为空，无法移除");
        }
    });
    addEvent(rightIn, "click", function () {
        if (data.length >= 60) {
            alert("输入的数字不能超过60个！");
            return;
        }
        if (!validinput(text.value)) {
        	alert("输入不合法，请输入10-100间的数字！");
        } else {
            data.push(parseInt(text.value)); //数组尾部加入
	        render(data);
    	}
    });
    addEvent(rightOut, "click", function () {
        if (data.length != 0) {
            data.pop();  //数组尾部删除
            render(data);
        } else {
            alert("队列为空，无法移除");
        }
    });
    addEvent(reset, "click", function() {
        data = [];
        render(data);
    });
    addEvent(random, "click", function() {
        data = [];
        for (var i = 0; i < 30; i++) {
            var num = Math.floor(91*Math.random()) + 10;
            data.push(num);
        }
        render(data);
    });
    addEvent(sort, "click", function() {
        data = bubblesort(data);
        var timer;
        timer = setInterval(draw, 300);  //每300ms循环一次
        function draw() {
            var dat = dataset.shift();
            if (dat.length != 0) {
                render(dat);
            } else {
                clearInterval(timer);
                return;
            }
        }
    });
    addEvent(text, "focus", function () {
       text.value = "";
    });
};