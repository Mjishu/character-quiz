global {
    type QuizItem = {
        Target: string;
        English: string;
        Phonetic?: string;
        Audio_src?: string;
    };

    type LanguageOptions = 'japanese' | 'korean';

    type Languages = {
        Language: LanguageOptions;
        Parts: string[];
        alphabets: string[];
        flag_src?: string;
    };
}

export {};
