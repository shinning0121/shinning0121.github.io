/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city = document.getElementById("aqi-city-input");
var value = document.getElementById("aqi-value-input");
var table = document.getElementById("aqi-table");
var alphaReg = /^[\u4e00-\u9fa5aa-zA-z]+$/;  //筛选中英文字符
var numReg = /^\d+$/;         //筛选数字
var nullReg = /[(^\s+)(\s+$)]/g;  //去掉两头空格
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var pcity = city.value.replace(nullReg,"");
	var pvalue = value.value.replace(nullReg,"");
	if (!alphaReg.test(pcity)) {
		alert("城市名只能包含中英文字符！");
		return;
	}
	if (!numReg.test(pvalue)) {
		alert("空气质量只能为整数数字！");
		return;
	}
	aqiData[pcity] = pvalue;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	table.innerHTML = "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>"; 
	for (var data in aqiData) {
		table.innerHTML += "<tr><td>" + data + "</td><td>" + aqiData[data] + "</td><td><button onclick = 'delBtnHandle(\""+data+"\")'>"+"删除" + "</button></td>"+"</tr>"; 
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(data) {
  // do sth.
  delete aqiData[data];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();