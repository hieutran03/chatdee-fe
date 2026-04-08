declare module 'emoji-picker-element';

declare namespace JSX {
  interface IntrinsicElements {
    'emoji-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      // Allow common attributes; web component specific attributes can be added if needed
      [key: string]: any;
    };
  }
}
