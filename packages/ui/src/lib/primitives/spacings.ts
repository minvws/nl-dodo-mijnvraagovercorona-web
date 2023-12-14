export const baseline = 4;

export const spacings = {
	1: 1, // 4px
	2: 2, // 8px
	3: 3, // 12px
	4: 4, // 16px
	6: 6, // 24px
	7: 7, // 28px
	8: 8, // 32px
	10: 10, // 40px
	12: 12, // 48px
	14: 14, // 56px
	16: 16, // 64px
} as const;

export type SpacingType = keyof typeof spacings;
