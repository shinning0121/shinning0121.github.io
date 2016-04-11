window.onload = function () {
    var textinput = document.getElementById("text-input");
    var textsearch = document.getElementById("text-search");
    var leftIn = document.getElementById("left-in");
    var leftOut = document.getElementById("left-out");
    var rightIn = document.getElementById("right-in");
    var rightOut = document.getElementById("right-out");
    var search = document.getElementById("search");
    var display = document.getElementById("result");
    var licontent = document.getElementsByTagName("li");
    var words = [];
    function addEvent(element, type, handler) {
        if (element.addEventListener) {  //兼容测试，非ie有这个属性
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {  //测试当前浏览器是否有这个属性
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;    //没有则添加事件
        }
    }
    function getWords(str) {
        return str.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g, " ").split(" ");  //用除了数字、汉字和英文的符号进行分隔
    }
    addEvent(leftIn, "click", function () {
        if (textinput.value == "") {
            alert("输入为空，请输入内容！");
        } else {
            var content = getWords(textinput.value);
            for (var i = content.length - 1; i >= 0; i--) {
                words.unshift(content[i]);
                var li = document.createElement("li");
                li.innerHTML = content[i];
                display.insertBefore(li, display.firstChild);
            }
        }
    });
    addEvent(leftOut, "click", function () {
        if (display.firstChild !== null) {
            words.shift();
            display.removeChild(display.firstChild);
        } else {
            alert("队列为空，无法移除");
        }
    });
    addEvent(rightIn, "click", function () {
        if (textinput.value == "") {
            alert("输入为空，请输入内容！");
        } else {
            var content = getWords(textinput.value);
            for (var i = content.length - 1; i >= 0; i--) {
                words.push(content[i]);
                var li = document.createElement("li");
                li.innerHTML = content[i];
                display.appendChild(li);
            }     
        }
    });
    addEvent(rightOut, "click", function () {
        if (display.lastChild !== null) {
            words.pop();
            display.removeChild(display.lastChild);
        } else {
            alert("队列为空，无法移除");
        }
    });
    addEvent(search, "click", function () {
        if (textsearch.value == "") {
            alert("输入为空，请输入搜索内容！");
        } else {
            var content = getWords(textsearch.value);
            for (var i = content.length - 1; i >= 0; i--) {
                for (var j = 0; j <= words.length - 1; j++) {
                    licontent[j].innerHTML = licontent[j].innerHTML.replace(new RegExp(content[i], "g"), "<span class='select'>" + content[i] + "</span>");
                }
            }
        }
    });
};

