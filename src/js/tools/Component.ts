export class Component<TState> {
  protected events: {
    [key: string]: (ev: Event) => void;
  } = {};

  constructor(private el: HTMLElement, protected state?: Partial<TState>) {
    this.el = el;
    setTimeout(() => {
      this.el.innerHTML = this.render();
      this.subscribeToEvents();
      this.onMount(this.el);
    }, 0);
  }
  render(): string {
    return "";
  }
  setState(obj: Partial<TState>) {
    this.state = { ...this.state, ...obj };
    this.el.innerHTML = this.render();
    this.subscribeToEvents();
  }
  onMount(el: HTMLElement): void {}
  private subscribeToEvents(): void {
    Object.entries(this.events).forEach(([key, fn]) => {
      const [eventName, selector] = key.split("@");
      if (eventName && selector) {
        this.el.querySelector(selector)?.addEventListener(eventName, fn);
      }
    });
  }
}
