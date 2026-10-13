import test from "node:test";
import assert from "node:assert/strict";
import {loopPhase, loopWave} from "./loop.mjs";
const near = (a,b) => assert.ok(Math.abs(a-b) < 1e-10);
test("same pose after one complete period across frame rates", () => {
  for (const fps of [24, 30, 60]) for (const frame of [-45, 0, 1, 45, 359])
    near(loopWave(loopPhase(frame,fps,12)),loopWave(loopPhase(frame+fps*12,fps,12)));
});
test("negative frames wrap correctly", () => near(loopPhase(-1,30,12),loopPhase(359,30,12)));
test("same elapsed time gives same pose at different fps", () => near(loopPhase(60,30,12),loopPhase(120,60,12)));
test("seam is one ordinary frame step, not a duplicate endpoint", () => {
  near(loopWave(loopPhase(360,30,12)),0);
  near(Math.abs(loopWave(loopPhase(359,30,12))),Math.abs(loopWave(loopPhase(1,30,12))));
});
test("invalid timing fails explicitly", () => {
  for(const args of [[0,0,12],[0,30,0],[NaN,30,12],[0,Infinity,12],[0,30,-1]])
    assert.throws(()=>loopPhase(...args),RangeError);
});
