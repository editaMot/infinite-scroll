import { renderHook } from "@testing-library/react";
import { act } from "react";
import useIntersectionObserver from "../useIntersectionObserver";

const observeMock = vi.fn();
const disconnectMock = vi.fn();
const unobserveMock = vi.fn();

beforeEach(() => {
  globalThis.IntersectionObserver = vi.fn(
    (callback: (entries: IntersectionObserverEntry[]) => void) => {
      intersectionCallback = callback;
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: unobserveMock,
      };
    }
  ) as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  vi.clearAllMocks();
});

let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;

describe("useIntersectionObserver", () => {
  it("should create an IntersectionObserver and observe the element", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntersectionObserver(callback));

    const node = document.createElement("div");
    act(() => {
      result.current(node as HTMLElement);
    });

    expect(observeMock).toHaveBeenCalledWith(node);
  });

  it("should call the callback with the correct entries when intersection occurs", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useIntersectionObserver(callback));

    const node = document.createElement("div");
    act(() => {
      result.current(node as HTMLElement);
    });

    const entries = [{ isIntersecting: true }] as IntersectionObserverEntry[];
    act(() => {
      intersectionCallback(entries);
    });

    expect(callback).toHaveBeenCalledWith(entries);
  });
});
