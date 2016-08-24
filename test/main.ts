import timeSynced from "../index"

import * as chai from "chai";

const expect = chai.expect;



describe("main test", function () {
    this.timeout(200000);

    it("should return true", function (done) {
        timeSynced().then((a) => {
            expect(a).to.be.ok;
            expect(a).to.be.equal(true);
            done()
        })

    })

})