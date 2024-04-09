// Types we allow in translations
export type DataType = string | number | boolean | object | DataType[];
// The "root" type for a specific translation
export type DataRoot = Record<string, DataType>;
// The mutable version of a DataRoot, useful to induce type from a variable
export type Translation<T extends DataRoot> = DeepMutable<DeepTo<DataType, T>>;

// The params for the translate function
export type TranslateParams = {
	count?: number;
	ordinal?: boolean;
	[key: string]: string | number | boolean;
};
// The function to translate a specific translation
export type TranslateFunction<T> = <
	TReturnType extends DataType = string,
	TInferredOrString = TReturnType extends Translation.DataType ? TReturnType : string
>(
	key: PropertyStringPath<T>,
	params?: TranslateParams
) => TInferredOrString;

export type PropNames = keyof Translation.All;
