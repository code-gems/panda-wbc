// types
import { PandaIconTemplate } from "../index";

class PandaIconLibrary {
	static instance: PandaIconLibrary | undefined;
	private _icons!: PandaIconTemplate[];

	constructor() {
		if (PandaIconLibrary.instance) {
			return;
		}
		// Initialize class properties
		this._icons = [];
		PandaIconLibrary.instance = this;
	}

	static getInstance() {
		PandaIconLibrary.instance ??= new PandaIconLibrary();
		return PandaIconLibrary.instance;
	}

	public registerIcons(icons: PandaIconTemplate[]): void {
		if (typeof icons === "object") {
			if (this._icons?.length) {
				this._icons = this._icons.concat(icons);
			} else {
				this._icons = icons;
			}
		}
	}

	public getIcon(iconName: string): string | undefined {
		return this._icons.find(({ name }) => name === iconName)?.template;
	}

	public getIconList(): string[] {
		return this._icons.map(({ name }) => name);
	}
};

export const pandaIconLibrary = new PandaIconLibrary();