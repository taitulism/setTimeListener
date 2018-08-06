const expect = require('chai').expect;
const sinon  = require('sinon');

const config = require('../src/set-time-listener');

const noop = () => {};

const START_TIME = 5555111100000

describe('setTimeListener', () => {
    describe('no configs', () => {
        let setTimeListener, spy;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers(START_TIME);
            setTimeListener = config();
            spy = sinon.spy();
        });

        afterEach(function () {
            this.clock.restore();
        });

        it('runs your callback on time', function () {
            const futureTime = START_TIME + 5000;
            setTimeListener(futureTime, spy);

            expect(spy.called).to.be.false;
            this.clock.tick(4999);
            expect(spy.called).to.be.false;
            this.clock.tick(1);
            expect(spy.called).to.be.true;
        });
    });

    describe('default configs', () => {
        let setTimeListener, spy;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers(START_TIME);
            setTimeListener = config(true);
            spy = sinon.spy();
        });

        afterEach(function () {
            this.clock.restore();
        });

        it('runs your callback 2ms before time', function () {
            const futureTime = START_TIME + 5000;
            setTimeListener(futureTime, spy);

            expect(spy.called).to.be.false;
            this.clock.tick(4997);
            expect(spy.called).to.be.false;
            this.clock.tick(1);
            expect(spy.called).to.be.true;
        });
    });

    describe('customed configs', () => {
        let setTimeListener, spy;

        beforeEach(function () {
            this.clock = sinon.useFakeTimers(START_TIME);
            
            spy = sinon.spy();
            
            setTimeListener = config({
                metaTick: 50,
                timeMargin: 5,
            });
        });

        afterEach(function () {
            this.clock.restore();
        });

        describe('when timeMargin is 5', () => {
            it('runs your callback 5ms before time', function () {
                const futureTime = START_TIME + 5000;
                setTimeListener(futureTime, spy);
    
                expect(spy.called).to.be.false;
                this.clock.tick(4994);
                expect(spy.called).to.be.false;
                this.clock.tick(1);
                expect(spy.called).to.be.true;
            });
        });

        describe('when metaTick is 50 and timeLeft is less than threshold', () => {
            it('runs your callback 5ms before time', function () {
                const futureTime = START_TIME + 99;
                setTimeListener(futureTime, spy);
    
                expect(spy.called).to.be.false;
                this.clock.tick(93);
                expect(spy.called).to.be.false;
                this.clock.tick(1);
                expect(spy.called).to.be.true;
            });
        });

        describe('when metaTick is 50 and timeLeft is greater than threshold', () => {
            it('runs your callback 5ms before time', function () {
                const futureTime = START_TIME + 100;
                setTimeListener(futureTime, spy);
    
                expect(spy.called).to.be.false;
                this.clock.tick(94);
                expect(spy.called).to.be.false;
                this.clock.tick(1);
                expect(spy.called).to.be.true;
            });
        });
    });

});

describe.skip('abort', () => {
    // TODO: can't get the original return value (setTimeout ref/abort)
    let setTimeListener, spy;

    beforeEach(function () {
        spy = sinon.spy();
        setTimeListener = config();
    });

    it('returns an `abort` function', function () {
        const futureTime = START_TIME + 5000;
        const abort = setTimeListener(futureTime, spy);

        console.log(abort);

        expect(abort).to.be.a('function');
    });
});