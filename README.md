# morgan-ym-d-log-stream
A stream tool, mainly a plugin for morgan, to save log to file dir/YYYY/M/YYYY-MM-DD.log

# Install
```
npm install morgan-ym-d-log-stream
```

# Usage & Api
```javascript
var morgan_ym_d_log_stream = require("morgan-ym-d-log-stream");

/*
create a log stream
createLogStream( logDir )
*/
var logStream = morgan_ym_d_log_stream(path.join(__dirname, "log"));

var logger = morgan( 'common', { stream: logStream } );		//creata a morgan function by the stream

/*
write a string
	.write(str)
*/
logStream.write("test, " + (new Date()).toLocaleString() + "\n");

/*
get current log file path
	.currentFilePath()
*/
console.log(logStream.currentFilePath());

```
