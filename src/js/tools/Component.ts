import { createNanoEvents, Emitter } from "nanoevents";

export abstract class Component<TState> {
  protected state?: Partial<TState>;
  protected emitter?: Emitter;

  protected events: {
    [key: string]: (ev: Event) => void;
  } = {};

  abstract render(): string;

  constructor(private el: HTMLElement, state?: Partial<TState>, emitter?: Emitter) {
    this.el = el;
    if (state) {
      this.state = { ...this.state, ...state };
    }

    if (emitter) {
      this.emitter = emitter;
    }

    setTimeout(() => {
      this.el.innerHTML = this.render();
      this.subscribeToEvents();
      this.onMount(this.el);
    }, 0);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onMount(el: HTMLElement): void {}

  setState(obj: Partial<TState>) {
    this.state = { ...this.state, ...obj };
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    Object.entries(this.events).forEach(([key, fn]) => {
      const [eventName, selector] = key.split("@");
      if (eventName && selector) {
        const elems = this.el.querySelectorAll(selector);
        elems.forEach((el) => {
          el.addEventListener(eventName, fn);
        });
      }
    });
  }
}
