import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { HamburgerState, HamburgerStateDispatcher } from './hamburgerStore.types';

const HamburgerStorageKey = 'hamburger-storage';

const initialState: HamburgerState = {
	isHamburgerClicked: false,
};

export const useHamburgerStore = create(
	persist<HamburgerStateDispatcher>(
		(set) => ({
			...initialState,
			dispatchIsHamburgerClicked(value) {
				set({ isHamburgerClicked: value });
			},
		}),
		{
			name: HamburgerStorageKey,
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
