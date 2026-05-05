/**
 * DISCLAIMER:
 * These types are for internal use only and are not intended to be exposed as part of the public API of the PandaTimePicker component.
 * They are used for type safety and code clarity within the implementation of the component and its related utilities.
 * These types may be subject to change without a major version bump, as they are not part of the public contract of the component.
 * Consumers of the PandaTimePicker component should not rely on these types in their own code, as they may change or be removed in future updates.
 */
export type RawValue = string | number | null | undefined;

export type TimeInputValue = string | number | null;

export type TimeObject = {
	hours: number | null;
	minutes: number | null;
	seconds: number | null;
	period: "am" | "pm" | null;
}
