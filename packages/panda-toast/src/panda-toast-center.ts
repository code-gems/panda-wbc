// types
import { PandaToast } from "../index";

export class PandaToastCenter {
	static instance: any;

	constructor() {
		if (!PandaToastCenter.instance) {
			PandaToastCenter.instance = this;
		}
		return PandaToastCenter.instance;
	}

	public createToast(toast: PandaToast) {

	}

	private _showToast() {

	}
}

export const pandaToastCenter = new PandaToastCenter();