function removeNullValues<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null)
    ) as Partial<T>;
}

// Deep check. Aware for circular references.
function checkAllPropertiesNotNull(obj: object): boolean {
    return Object.values(obj).every(value => {
        debugger;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            if (value.constructor.name === 'Object') {
                return checkAllPropertiesNotNull(value);
            }
        }
        return value != null;
    });
}

export {
    removeNullValues,
    checkAllPropertiesNotNull,
};