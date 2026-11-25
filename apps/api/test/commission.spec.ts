import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { commissionAmount } from "../src/modules/commissions/commission.util";

describe("commissionAmount", () => {
  it("rounds 5 percent of a naira subtotal", () => {
    assert.equal(commissionAmount(200000, 0.05), 10000);
  });

  it("rounds half-naira results to the nearest naira", () => {
    assert.equal(commissionAmount(333, 0.05), 17);
  });
});
