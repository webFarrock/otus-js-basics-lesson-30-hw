export abstract class Component<TState> {
  protected events: {
    [key: string]: (ev: Event) => void;
  } = {};

  abstract render(): string;

  constructor(private el: HTMLElement, protected state?: Partial<TState>) {
    this.el = el;
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
        this.el.querySelector(selector)?.addEventListener(eventName, fn);
      }
    });
  }
}
