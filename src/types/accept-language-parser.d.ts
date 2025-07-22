declare module 'accept-language-parser' {
  interface ParsedLanguage {
    code: string;
    script?: string;
    region?: string;
    quality: number;
  }

  interface AcceptLanguageParser {
    parse(acceptLanguage: string): ParsedLanguage[];
    pick(supportedLanguages: string[], acceptLanguage: string, options?: { loose?: boolean }): string | null;
  }

  const acceptLanguageParser: AcceptLanguageParser;
  export default acceptLanguageParser;
} 