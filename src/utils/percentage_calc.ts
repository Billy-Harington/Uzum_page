export const calculateDiscountPrice = (originalPrice: number, discountPercentage: number): number => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
};