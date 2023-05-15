export const util = {
    filterArrayOfObjects: (array, key) => {
        return array.variants.filter(
            (element, index, self) =>
                index === self.findIndex((obj) => obj[key] === element[key])
        );
    },
};
