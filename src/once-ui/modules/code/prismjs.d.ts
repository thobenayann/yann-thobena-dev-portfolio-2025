/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'prismjs' {
    const Prism: {
        highlightAll: () => void;
        highlight: (code: string, grammar: any, language: string) => string;
        languages: {
            [language: string]: any;
        };
    };
    export default Prism;
}
