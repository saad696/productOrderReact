import { localStorageService } from './localStorageService';

export const util = {
    filterArrayOfObjects: (array, key) => {
        return array.variants.filter(
            (element, index, self) =>
                index === self.findIndex((obj) => obj[key] === element[key])
        );
    },
    getCartTotal: () => {
        const total = [
            { key: 'Items Total', value: 0 },
            { key: 'SGST (9%)', value: 0 },
            { key: 'CGST (9%)', value: 0 },
            { key: 'IGST (9%)', value: 0 },
            { key: 'Taxable Amount', value: 0 },
            { key: 'Order Total', value: 0 },
        ];
        const data = localStorageService.getCartItems();
        
        // calculating items total
        data.forEach((item) => {
            total[0].value += item.total;
        });
        
        const taxAmt = (total[0].value * 9) / 100;
        
        // total items percentage
        total[1].value = taxAmt;
        total[2].value = taxAmt;
        total[3].value = taxAmt;

        // total taxable amount
        total[4].value = total[3].value + total[2].value + total[1].value;

        // entire order total
        total[5].value =
            total[0].value + total[3].value + total[2].value + total[1].value;

        return total;
    },
};
