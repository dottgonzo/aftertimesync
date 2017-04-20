import * as Promise from "bluebird";
import * as superagent from "superagent";
import * as child_process from "child_process";


interface IOptions {
    setmanually?: true
}


function setTimeManually() {
    return new Promise<boolean>((resolve, reject) => {

        child_process.exec('sudo date -s "$(wget -qSO- --max-redirect=0 google.com 2>&1 | grep Date: | cut -d\' \' -f5-8)Z"', (err, stdout, stderr) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })

    })
}


export default function timeSynced(interval?: number, timeout?: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {


        function checkTime(options?: IOptions) {
            return new Promise<boolean>((resolve, reject) => {

                superagent.get("https://io.kernel.online/date").end((err, res) => {

                    if (err) {
                        if (options && options.setmanually) {
                            console.log('setmanually')
                            setTimeManually().then(() => {
                                resolve(true);
                            }).catch((err) => {
                                reject(err)
                            })

                        } else {
                            reject('unreachable time')

                            reject(err)
                        }
                    } else {
                        if (new Date().getTime() > (res.body.unixtime - (60000 * 5))) {
                            resolve(true);
                        } else if (options && options.setmanually) {

                            setTimeManually().then(() => {
                                resolve(true);
                            }).catch((err) => {
                                reject(err)
                            })

                        } else {
                            reject('not now')
                        }
                    }


                })
            })

        }


        if (!interval) interval = 20000
        if (!timeout) timeout = 20

        let timeoutcycle = 0
        let options: IOptions = {}

        checkTime().then(() => {
            resolve(true)

        }).catch((err) => {

            const startcheck = setInterval(() => {

                if ((timeoutcycle * interval) > (60000 * 2)) options.setmanually = true
                checkTime(options).then(() => {
                    timeoutcycle = 0
                    clearInterval(startcheck)
                    resolve(true)
                }).catch((err) => {
                    timeoutcycle += 1
                    if (timeout && timeoutcycle > timeout) {
                        reject('timeout')
                    }
                })
            }, interval)

        })


    })
}