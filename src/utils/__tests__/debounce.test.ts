import { debounce } from "../debounce";

describe("debounce", () => {
  it("should call the debounced function after the specified delay", () => {
    const mockFunction = vi.fn();
    const debouncedFunction = debounce(mockFunction, 100);

    debouncedFunction("test");

    expect(mockFunction).not.toBeCalled();

    setTimeout(() => {
      expect(mockFunction).toBeCalledWith("test");
    }, 100);
  });

  it("should cancel the previous timeout if a new call is made before the delay", () => {
    const mockFunction = vi.fn();
    const debouncedFunction = debounce(mockFunction, 100);

    debouncedFunction("first");
    debouncedFunction("second");

    setTimeout(() => {
      expect(mockFunction).toBeCalledWith("second");
      expect(mockFunction).not.toBeCalledWith("first");
    }, 150);
  });
});
