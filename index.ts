import * as Promise from "bluebird";
import * as superagent from "superagent";



export default function timeSynced(interval?: number):Promise<boolean> {
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


        if (!interval) interval = 5000

        checkTime().then(() => {
            resolve(true)

        }).catch((err) => {

            const startcheck = setInterval(() => {
                checkTime().then(() => {
                    clearInterval(startcheck)
                    resolve(true)
                })
            }, interval)

        })


    })
}