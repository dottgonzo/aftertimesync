"use strict";
var index_1 = require("../index");
var chai = require("chai");
var expect = chai.expect;
describe("main test", function () {
    this.timeout(200000);
    it("should return true", function (done) {
        index_1.default().then(function (a) {
            expect(a).to.be.ok;
            expect(a).to.be.equal(true);
            done();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQXVCLFVBRXZCLENBQUMsQ0FGZ0M7QUFFakMsSUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFFN0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUkzQixRQUFRLENBQUMsV0FBVyxFQUFFO0lBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFckIsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFVBQVUsSUFBSTtRQUNuQyxlQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsSUFBSSxFQUFFLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoidGVzdC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRpbWVTeW5jZWQgZnJvbSBcIi4uL2luZGV4XCJcblxuaW1wb3J0ICogYXMgY2hhaSBmcm9tIFwiY2hhaVwiO1xuXG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcblxuXG5cbmRlc2NyaWJlKFwibWFpbiB0ZXN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRpbWVvdXQoMjAwMDAwKTtcblxuICAgIGl0KFwic2hvdWxkIHJldHVybiB0cnVlXCIsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgIHRpbWVTeW5jZWQoKS50aGVuKChhKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoYSkudG8uYmUub2s7XG4gICAgICAgICAgICBleHBlY3QoYSkudG8uYmUuZXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcblxuICAgIH0pXG5cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
