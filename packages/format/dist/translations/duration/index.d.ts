export declare const key = "duration";
export declare const t: <TReturnType extends import("@288-toolkit/i18n").DataType = string, TInferredOrString = TReturnType extends import("@288-toolkit/i18n").DataType ? TReturnType : string>(path: import("@288-toolkit/types").PropertyStringPath<{
    units: {
        long: {
            second: string;
            seconds: string;
            minute: string;
            minutes: string;
            hour: string;
            hours: string;
        };
        short: {
            second: string;
            seconds: string;
            minute: string;
            minutes: string;
            hour: string;
            hours: string;
        };
    };
    joins: {
        and: string;
    };
    lessThan: string;
}>, data?: import("@288-toolkit/i18n").TranslateParams | undefined) => TInferredOrString;
