import { assertEquals } from "https://deno.land/std@0.204.0/assert/mod.ts";
import { sanitize } from "./lib.ts";

Deno.test('sanitize', () => {
  assertEquals('expected', sanitize('<samp>expected</samp>'));
});
