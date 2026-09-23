import assert from "node:assert/strict";
import test from "node:test";

// Load Next's production output so this test verifies the same route artifact deployed by the build.
import resumeRoute from "../.next/server/app/api/resume/route.js";

test("the resume endpoint returns a one-page ATS PDF with the requested download filename", async () => {
  const response = await resumeRoute.routeModule.userland.GET();
  const pdf = Buffer.from(await response.arrayBuffer());
  const pdfText = pdf.toString("latin1");

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/pdf");
  assert.match(
    response.headers.get("content-disposition") ?? "",
    /filename\*=UTF-8''Jose%20Vener%20Rafael%20%E2%80%94%20Resume\.pdf/
  );
  assert.equal(pdf.subarray(0, 8).toString(), "%PDF-1.4");
  assert.match(pdfText, /JOSE VENER RAFAEL/);
  assert.match(pdfText, /\+63 9953223495/);
  assert.match(pdfText, /Page 1 of 1/);
  assert.equal((pdfText.match(/\/Type \/Page(?!s)/g) ?? []).length, 1);
});
