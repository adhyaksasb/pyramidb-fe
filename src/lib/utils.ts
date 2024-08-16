import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const isValidEmail = (email: string): boolean => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
};

export const isValidPassword = (password: string): boolean => {
	// Password must be at least 6 characters long, contain at least one number, and one capital letter
	const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
	return passwordPattern.test(password);
};

export const getRangeStats = (max: number, min: number, stats: number): number => {
	const value = 100 - ((max - stats) / (max - min)) * 100;
	const rounded = Math.max(parseFloat(value.toFixed(2)), 1);

	return rounded;
};

export const containsString = (arr: string[], searchString: string): boolean => {
	return arr.includes(searchString);
};

export const areArraysOneToOne = <T>(arr1: T[], arr2: T[]): boolean => {
	// Check if arrays are of the same length
	if (arr1.length !== arr2.length) {
		return false;
	}

	// Create maps to track element mappings
	const map1To2 = new Map<T, T>();
	const map2To1 = new Map<T, T>();

	for (let i = 0; i < arr1.length; i++) {
		const elem1 = arr1[i];
		const elem2 = arr2[i];

		// Check for existing mappings in map1To2
		if (map1To2.has(elem1)) {
			if (map1To2.get(elem1) !== elem2) {
				return false; // Mapping conflict
			}
		} else {
			map1To2.set(elem1, elem2);
		}

		// Check for existing mappings in map2To1
		if (map2To1.has(elem2)) {
			if (map2To1.get(elem2) !== elem1) {
				return false; // Mapping conflict
			}
		} else {
			map2To1.set(elem2, elem1);
		}
	}

	return true; // All mappings are consistent
};
