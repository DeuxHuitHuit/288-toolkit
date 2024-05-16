import type { AnonymousObject, PropertyStringPath } from '@288-toolkit/types';
import type { DataType, TranslateParams, Translation } from '../../types';
export declare const createTranslate: <TTranslationsObject extends AnonymousObject, const T extends Translation = Translation, Language extends keyof T["loaders"] = string>(translation: Translation, language: Language) => Promise<(<TReturnType extends DataType = string, TInferredOrString = TReturnType extends DataType ? TReturnType : string>(path: PropertyStringPath<TTranslationsObject>, data?: TranslateParams) => TInferredOrString)>;
