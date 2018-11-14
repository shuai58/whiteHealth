module.exports = {
    height: height,
    age: age
}

function height(callback) {
	var height = [];
	for(var i=60;i<=220;i++) {
		height.push(i);
	}
	callback(height)
}
function age(callback) {
	var age = [];
	for(var i=1;i<=100;i++) {
		age.push(i);
	}
	callback(age)
}