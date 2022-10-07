
//global variable, for html page, refer tpsvr @ npm.
morgan_ym_d_log_stream = require("../morgan-ym-d-log-stream.js");

module.exports = {

	"morgan_ym_d_log_stream": function (done) {
		if (typeof window !== "undefined") throw "disable for browser";

		var path = require('path');

		/*
		create a log stream
		createLogStream( logDir )
		*/
		var logStream = morgan_ym_d_log_stream(path.join(__dirname, "log"));

		/*
		write a string
			.write(str)
		*/
		logStream.write("test, " + (new Date()).toLocaleString() + "\n");

		/*
		get current log file path
			.currentFilePath()
		*/
		var fpath = logStream.currentFilePath()
		console.log(fpath);

		done(!(
			fpath
		));
	},

	"check exports": function (done) {
		var m = morgan_ym_d_log_stream;
		for (var i in m) {
			if (typeof m[i] === "undefined") { done("undefined: " + i); return; }
		}
		done(false);

		console.log(m);
		var list = "export list: " + Object.keys(m).join(", ");
		console.log(list);
		return list;
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('morgan_ym_d_log_stream', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
