import assert from "assert";
import { describe, it } from "node:test";

describe("Auth API", () => {
  it("should be able to login with valid credentials", async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "motty",
        password: "1234",
      }),
    });

    assert.strictEqual(response.status, 200);
    
    const data = await response.json();
    assert.ok(data.token, "Token should be present in response");
    assert.strictEqual(typeof data.token, "string", "Token should be a string");
  });

  it("should reject login with invalid credentials", async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "invalid",
        password: "wrong",
      }),
    });

    assert.strictEqual(response.status, 401);
  });

  it("should reject login with missing credentials", async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "motty",
        // missing password
      }),
    });

    assert.strictEqual(response.status, 400);
  });
});
