import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildInvoicePdf, type InvoiceData } from "@/lib/invoice";

describe("invoice page fit", () => {
  it("keeps invoices with 1, 3, or 5 products on one page", () => {
    for (const productCount of [1, 3, 5]) {
      const items = Array.from({ length: productCount }, (_, index) => ({
        id: index + 1,
        name: `Studio wireless earbuds model ${index + 1}`,
        qty: 1,
        price: 2499,
      }));
      const invoice: InvoiceData = {
        id: `test-order-${productCount}`,
        createdAt: "2026-11-06T00:00:00.000Z",
        total: productCount * 2499 * 1.18,
        subtotal: productCount * 2499,
        tax: productCount * 2499 * 0.18,
        shipping: 0,
        status: "confirmed",
        paymentMethod: "card",
        items,
      };

      assert.equal(buildInvoicePdf(invoice).getNumberOfPages(), 1);
    }
  });
});