/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var display = document.getElementsByClassName("aqi-chart-wrap")[0];
  display.innerHTML = "";
  for (time in chartData) {
    color = 'rgb('+parseInt(256*Math.random())+','+parseInt(256*Math.random())+','+parseInt(256*Math.random())+')';
    display.innerHTML += "<div style = 'background-color:" + color + "; margin:0 1px; width: 100px;" +
      "height:" + chartData[time] + "px;' title =" + (time + "空气质量：" + chartData[time]) + "></div>";
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if (pageState.nowGraTime == this.value) {
    return;
  }
  // 设置对应数据
  pageState.nowGraTime = this.value;
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if (this[this.selectedIndex].value == pageState.nowSelectCity) {
    return;
  }
  // 设置对应数据
  pageState.nowSelectCity = this[this.selectedIndex].value;
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  
  var inputTime = document.getElementById("form-gra-time").getElementsByTagName("input");
  for (var i = inputTime.length - 1; i >= 0; i--) {
    inputTime[i].onclick = graTimeChange;
  }

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityselect = document.getElementById("city-select");
  cityselect.innerHTML = "";
  for (var city in aqiSourceData) {
    if (pageState.nowSelectCity == -1) {
      pageState.nowSelectCity = city;
    }
    cityselect.innerHTML += "<option>" + city + "</option>";
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  cityselect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var cityData = aqiSourceData[pageState.nowSelectCity];
  if (pageState.nowGraTime == "day") {
    chartData = cityData;
  }
  if (pageState.nowGraTime == "week") {
    chartData = {};
    var daynum = 0;
    var daysum = 0;
    var datestart = "";
    var lastdate = "";
    for (date in cityData) {
      var dat = new Date(date);
      var day = dat.getDay();
      if (day == 0) {
        if (daysum != 0) {
          var avedata = Math.floor(daysum/daynum);
          var weekname = datestart + '-' + lastdate;
          chartData[weekname] = avedata;
        }
        daysum = 0;
        daynum = 0;
        datestart = date;
      } else {
        if (daysum == 0) {
          datestart = date;
        }
      }
      daynum += 1;
      daysum += cityData[date];
      lastdate = date;
    }
    if (daysum > 0) {
      var avedata = Math.floor(daysum/daynum);
      var weekname = datestart + '-' + date;
      chartData[weekname] = avedata;
    }
  }
  if (pageState.nowGraTime == "month") {
    chartData = {};
    var daynum = 0;
    var daysum = 0;
    var monthnow = 0;
    for (date in cityData) {
      var dat = new Date(date);
      var month = dat.getMonth() + 1;
      if (month != monthnow) {
        if (daynum != 0) {
          var avedata = Math.floor(daysum/daynum);
          var monthname = dat.getFullYear() + "年" + monthnow + "月";
          chartData[monthname] = avedata;
          daynum = 0;
          daysum = 0;
        }
        monthnow = month; 
      }
      daynum++;
      daysum += cityData[date];
    }
    if (daysum > 0) {
      var avedata = Math.floor(daysum/daynum);
      var monthname = dat.getFullYear() + "年" + monthnow + "月";
      chartData[monthname] = avedata;
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();

  renderChart();
}

init();