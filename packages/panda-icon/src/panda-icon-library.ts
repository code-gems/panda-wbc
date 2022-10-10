export type PandaIconTemplate = {
	name: string;
	template: string;
}

export class PandaIconLibrary {
	static instance: any;
	private _icons!: PandaIconTemplate[];

	constructor() {
		if (!PandaIconLibrary.instance) {
			PandaIconLibrary.instance = this;
		}
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
