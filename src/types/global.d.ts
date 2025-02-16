global {
      type QuizItem = {
            Target: string;
            English: string;
            Phonetic?: string;
            Audio_src?: string;
      }

      type LanguageOptions = "Japanese" | "Korean" 

      type Languages = {
            Language: LanguageOptions;
            alphabets: string[];
            flag_src?: string;
      }
}

export {};