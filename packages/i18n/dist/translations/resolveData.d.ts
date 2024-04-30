import type { DataRoot, DataType } from '../types';
export declare const resolveData: <TReturnType extends DataType = string, TInferredOrString = TReturnType extends DataType ? TReturnType : string>(value: string, data: DataRoot) => TInferredOrString;
