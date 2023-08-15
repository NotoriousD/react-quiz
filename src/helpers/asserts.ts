import { Family } from "types";
import { RadioValue } from "types/radio";

export const assertToString = (data: any): data is string | number => {
    return typeof data === 'string' || typeof data === 'number';
};

export const assertToFamilyInstance = (object: any): object is { data: Family[]; score?: number } => {
    if(typeof object === 'object' && object.data && Array.isArray(object.data)) {
        return true;
    }

    return false;
}

export const assertToObject = (object: any): object is RadioValue<any, string | number> => {
    if(typeof object !== 'object') {
        return false;
    }

    return true;
};

export const assertToValueNonPrimitive = (object: any): object is RadioValue<any, any[] | { name: string; value: string; }> => {
    if(typeof object !== 'object') {
        return false;
    }

    if(object?.value && typeof object.value !== 'object') {
        return false;
    }

    return true;
};