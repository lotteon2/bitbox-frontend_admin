export interface HamburgerState {
	isHamburgerClicked: boolean;
}

export interface HamburgerStateDispatcher extends HamburgerState {
	dispatchIsHamburgerClicked: (value: boolean) => void;
}
