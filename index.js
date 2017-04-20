"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var superagent = require("superagent");
var child_process = require("child_process");
function setTimeManually() {
    return new Promise(function (resolve, reject) {
        child_process.exec('sudo date -s "$(wget -qSO- --max-redirect=0 google.com 2>&1 | grep Date: | cut -d\' \' -f5-8)Z"', function (err, stdout, stderr) {
            if (err) {
                reject(err);
            }
            else {
                console.log('time set manually');
                resolve(true);
            }
        });
    });
}
function timeSynced(interval, timeout) {
    return new Promise(function (resolve, reject) {
        function checkTime(options) {
            return new Promise(function (resolve, reject) {
                superagent.get("https://io.kernel.online/date").end(function (err, res) {
                    if (err) {
                        if (options && options.setmanually) {
                            setTimeManually().then(function () {
                                resolve(true);
                            }).catch(function (err) {
                                reject(err);
                            });
                        }
                        else {
                            console.log('unreachable time');
                            reject(err);
                        }
                    }
                    else {
                        if (new Date().getTime() > (res.body.unixtime - (60000 * 5))) {
                            resolve(true);
                        }
                        else if (options && options.setmanually) {
                            setTimeManually().then(function () {
                                resolve(true);
                            }).catch(function (err) {
                                reject(err);
                            });
                        }
                        else {
                            reject('not now');
                        }
                    }
                });
            });
        }
        if (!interval)
            interval = 20000;
        if (!timeout)
            timeout = 20;
        var timeoutcycle = 0;
        var options = {};
        checkTime().then(function () {
            resolve(true);
        }).catch(function (err) {
            var startcheck = setInterval(function () {
                if ((timeoutcycle * interval) > (60000 * 2))
                    options.setmanually = true;
                checkTime(options).then(function () {
                    timeoutcycle = 0;
                    clearInterval(startcheck);
                    resolve(true);
                }).catch(function (err) {
                    timeoutcycle += 1;
                    if (timeout && timeoutcycle > timeout) {
                        reject('timeout');
                    }
                });
            }, interval);
        });
    });
}
exports.default = timeSynced;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFBO1FBRTFCLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVqQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBRVQsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDO2dCQUUzQixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtnQkFDdkUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDcEIsWUFBWSxHQUFHLENBQUMsQ0FBQTtvQkFDaEIsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFBO29CQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7b0JBQ1QsWUFBWSxJQUFJLENBQUMsQ0FBQTtvQkFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7b0JBQ3JCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFFaEIsQ0FBQyxDQUFDLENBQUE7SUFHTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUExRUQsNkJBMEVDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcbmltcG9ydCAqIGFzIHN1cGVyYWdlbnQgZnJvbSBcInN1cGVyYWdlbnRcIjtcbmltcG9ydCAqIGFzIGNoaWxkX3Byb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuXG5pbnRlcmZhY2UgSU9wdGlvbnMge1xuICAgIHNldG1hbnVhbGx5PzogdHJ1ZVxufVxuXG5cbmZ1bmN0aW9uIHNldFRpbWVNYW51YWxseSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgIGNoaWxkX3Byb2Nlc3MuZXhlYygnc3VkbyBkYXRlIC1zIFwiJCh3Z2V0IC1xU08tIC0tbWF4LXJlZGlyZWN0PTAgZ29vZ2xlLmNvbSAyPiYxIHwgZ3JlcCBEYXRlOiB8IGN1dCAtZFxcJyBcXCcgLWY1LTgpWlwiJywgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGltZSBzZXQgbWFudWFsbHknKVxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH0pXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGltZVN5bmNlZChpbnRlcnZhbD86IG51bWJlciwgdGltZW91dD86IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblxuICAgICAgICBmdW5jdGlvbiBjaGVja1RpbWUob3B0aW9ucz86IElPcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgc3VwZXJhZ2VudC5nZXQoXCJodHRwczovL2lvLmtlcm5lbC5vbmxpbmUvZGF0ZVwiKS5lbmQoKGVyciwgcmVzKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZXRtYW51YWxseSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVNYW51YWxseSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1bnJlYWNoYWJsZSB0aW1lJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpID4gKHJlcy5ib2R5LnVuaXh0aW1lIC0gKDYwMDAwICogNSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNldG1hbnVhbGx5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lTWFudWFsbHkoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ25vdCBub3cnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICghaW50ZXJ2YWwpIGludGVydmFsID0gMjAwMDBcbiAgICAgICAgaWYgKCF0aW1lb3V0KSB0aW1lb3V0ID0gMjBcblxuICAgICAgICBsZXQgdGltZW91dGN5Y2xlID0gMFxuICAgICAgICBsZXQgb3B0aW9uczogSU9wdGlvbnMgPSB7fVxuXG4gICAgICAgIGNoZWNrVGltZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgc3RhcnRjaGVjayA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICgodGltZW91dGN5Y2xlICogaW50ZXJ2YWwpID4gKDYwMDAwICogMikpIG9wdGlvbnMuc2V0bWFudWFsbHkgPSB0cnVlXG4gICAgICAgICAgICAgICAgY2hlY2tUaW1lKG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0Y3ljbGUgPSAwXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3RhcnRjaGVjaylcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dGN5Y2xlICs9IDFcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQgJiYgdGltZW91dGN5Y2xlID4gdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCd0aW1lb3V0JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCBpbnRlcnZhbClcblxuICAgICAgICB9KVxuXG5cbiAgICB9KVxufSJdfQ==
