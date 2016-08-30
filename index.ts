import * as Promise from "bluebird";
import * as superagent from "superagent";



export default function timeSynced(interval?: number, timeout?: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {


        function checkTime() {
            return new Promise<boolean>((resolve, reject) => {

                superagent.get("https://io.kernel.online/date").end((err, res) => {

                    if (err) {
                        reject(err)
                    } else {
                        if (new Date().getTime() > (res.body.unixtime - 90000)) {
                            resolve(true);
                        } else {
                            reject('not now')
                        }
                    }


                })
            })

        }


        if (!interval) interval = 20000
        if (!timeout) timeout = 200

        let timeoutcycle = 0


        checkTime().then(() => {
            resolve(true)

        }).catch((err) => {

            const startcheck = setInterval(() => {
                checkTime().then(() => {
                    timeoutcycle = 0
                    clearInterval(startcheck)
                    resolve(true)
                }).catch((err) => {
                    timeoutcycle += 1
                    if (timeout&&timeoutcycle > timeout) {
                        reject('timeout')
                    }
                })
            }, interval)

        })


    })
}