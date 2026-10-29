
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { debounce } from "../src/debounce.js";

describe("debounce", () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ["setTimeout"] });
  });

  afterEach(() => {
    mock.reset();
  });

  it("calls the function once with the last arguments", () => {
    const fn = mock.fn((query: string) => query.length);
    const search = debounce(fn, 300);

    search("r");
    search("re");
    search("rea");

    mock.timers.tick(299);
    assert.equal(fn.mock.callCount(), 0);

    mock.timers.tick(1);
    assert.deepEqual(
      fn.mock.calls.map((call) => call.arguments),
      [["rea"]]
    );
  });

  it("cancel() prevents the pending call and flush() runs it immediately", () => {
    const fn = mock.fn((n: number) => n);
    const save = debounce(fn, 100);

    save(1);
    save.cancel();
    mock.timers.tick(200);
    assert.equal(fn.mock.callCount(), 0);

    save(2);
    save.flush();

    assert.deepEqual(
      fn.mock.calls.map((call) => call.arguments),
      [[2]]
    );
  });
});
