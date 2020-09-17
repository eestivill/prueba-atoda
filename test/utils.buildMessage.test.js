const assert = require("assert");
const buildMessage = require("../utils/buildMessage");

describe("utils - buildMessage", function () {
  describe("when receives an entity an a action", function () {
    it("should return the respective message", function () {
      const result = buildMessage("EstadosPedidos", "create");
      const expect = "EstadosPedidos create";
      assert.strictEqual(result, expect);
    });
  });

  describe("when receives an entity an a action and is a list", function () {
    it("should return the respective message with the entity in plural", function () {
      const result = buildMessage("EstadosPedidos", "list");
      const expect = "EstadosPedidos list";
      assert.strictEqual(result, expect);
    });
  });
});
