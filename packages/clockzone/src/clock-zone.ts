export class ClockZone {

	/**
	 * The current time of the clock, which can be a string (e.g., "12:00 PM"), a number (e.g., timestamp), or null if not set.
	 */
	get time(): string | number | null {
		return this._time;
	}
	
	set time(value: string | number | null) {
		this._time = value;
	}

	private _time: string | number | null;


	/**
	 * timezone
	 * ------
	 * The time zone of the clock, which can be set to a specific time zone (e.g., "UTC", "America/New_York") or retrieved to determine the current time zone.
	 * The getter and setter for the timezone property allow you to manage the time zone of the clock, enabling you to display or manipulate time according to different time zones as needed.
	 * @example
	 * ```javascript
	 * const clock = new ClockZone();
	 * console.log(clock.timezone); // Outputs the current time zone (e.g., "UTC")
	 * clock.timezone = "America/New_York"; // Sets the time zone to "America/New_York"
	 * console.log(clock.timezone); // Outputs: "America/New_York"
	 * 
	 * // You can also chain the setter for timezone
	 * clock.setTimezone("Europe/London").add(1, "hours"); // Sets the time zone to "Europe/London" and adds 1 hour to the time
	 * ```
	 */
	get timezone(): string {
		return this.getTimezone();
	}

	set timezone(zone: string) {
		this.setTimezone(zone);
	}

	private _timezone: string;

	constructor(time: string | number | null = null) {
		this._time = time;
		this._timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	}

	// ========================================================================
	// API ====================================================================
	// ========================================================================

	toString(): string {
		console.log(`%c ⚡ toString()`, "font-size: 24px; color: crimson; background: black;");
		
		return String(this._time);
	}

	format(format: string): string {
		// Placeholder for actual formatting logic
		return this.toString();
	}

	add(amount: number, unit: "seconds" | "minutes" | "hours"): this {
		// Placeholder for actual addition logic
		return this;
	}

	subtract(amount: number, unit: "seconds" | "minutes" | "hours"): this {
		// Placeholder for actual subtraction logic
		return this;
	}

	/**
	 * Sets the time zone for the clock.
	 * @param zone The time zone to set (e.g., "UTC", "America/New_York").
	 * @returns {this} The current instance for chaining.
	 */
	setTimezone(zone: string): this {
		this._timezone = zone;
		// Placeholder for actual time zone conversion logic
		return this;
	}

	/**
	 * Retrieves the current time zone of the clock.
	 * @returns {string} The current time zone (e.g., "UTC", "America/New_York").
	 */
	getTimezone(): string {
		// Placeholder for actual time zone retrieval logic
		return this._timezone;
	}
}

export default ClockZone;