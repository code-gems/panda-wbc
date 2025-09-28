class AbortControlManager {
	static instance: any;
	private _abortControllerMap!: Map<string, AbortController>;

	constructor() {
		if (!AbortControlManager.instance) {
			this._abortControllerMap = new Map();
			AbortControlManager.instance = this;
		}
		return AbortControlManager.instance;
	}

	getAbortSignal(scope: string = "__noScope"): AbortSignal {
		if (this._abortControllerMap.has(scope)) {
			const controller = this._abortControllerMap.get(scope) as AbortController;
			return controller.signal;
		} else {
			const controller = new AbortController();
			this._abortControllerMap.set(scope, controller);
			return controller.signal;
		}
	}

	abort(scope: string = "__noScope"): void {
		if (this._abortControllerMap.has(scope)) {
			const controller = this._abortControllerMap.get(scope) as AbortController;
			controller.abort();
			// clean up
			this._abortControllerMap.delete(scope);
		} else {
			console.warn("%c [ABORT CONTROL MANAGER] abort() - Controller scope not defined!", "font-size: 16px;");
		}
	}

	/** Abort all signals */
	abortAll(): void {
		this._abortControllerMap.forEach((controller) => {
			controller.abort();
		});
		// clean up
		this._abortControllerMap = new Map();
	}
}

export default AbortControlManager;