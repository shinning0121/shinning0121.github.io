
window.onload = function () {
    var text = document.getElementById("number-input");
    var leftIn = document.getElementById("left-in");
    var leftOut = document.getElementById("left-out");
    var rightIn = document.getElementById("right-in");
    var rightOut = document.getElementById("right-out");
    var display = document.getElementById("result");
    function addEvent(element, type, handler) {
        if (element.addEventListener) {  //兼容测试，非ie有这个属性
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {  //测试当前浏览器是否有这个属性
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;    //没有则添加事件
        }
    }
    function validinput(value) {
    	var number = /^\d+$/;
    	return number.test(value);
    }
    addEvent(leftIn, "click", function () {
        if (!validinput(text.value)) {
        	alert("输入不合法，请输入纯数字！");
        } else {
			var li = document.createElement("li");
        	li.innerHTML = text.value;
        	display.insertBefore(li, display.firstChild);
        }
    });
    addEvent(leftOut, "click", function () {
        if (display.firstChild !== null) {
            display.removeChild(display.firstChild);
        } else {
            alert("队列为空，无法移除");
        }
    });
    addEvent(rightIn, "click", function () {
        if (!validinput(text.value)) {
        	alert("输入不合法，请输入纯数字！");
        } else {
	        var li = document.createElement("li");
	        li.innerHTML = text.value;
	        display.appendChild(li);
    	}
    });
    addEvent(rightOut, "click", function () {
        if (display.lastChild !== null) {
            display.removeChild(display.lastChild);
        } else {
            alert("队列为空，无法移除");
        }
    });
    addEvent(text, "focus", function () {
       text.value = "";
    });
};

