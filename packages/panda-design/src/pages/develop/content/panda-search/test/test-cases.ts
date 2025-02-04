/**
 * Status can be:
 * STATUS: ❌ FAIL
 * STATUS: ✅ PASS
 */

/**
 * CASE 1 - Typing in value and seeing the search results
 * 1. Type in "Pol" and wait for results to come back
 * 
 * EXPECTATION:
 * - @on-input event should be dispatched (value: Pol)
 * - @on-input-debounced event should be dispatched (value: Pol)
 * - dropdown should appear with 2 options (French Polynesia, Poland)
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 2 - Typing in value and seeing the search results
 * 1. Type in "Pol" and wait for results to come back
 * 2. Select "Poland" option
 * 
 * EXPECTATION:
 * - @on-input event should be dispatched (value: Pol)
 * - @on-input-debounced event should be dispatched (value: Pol)
 * - dropdown should appear with 2 options (French Polynesia, Poland)
 * - @on-select event should be dispatched (selectedItem: { label: "Poland", value: "PL" })
 * - dropdown should be closed
 * 
 * STATUS: ✅ PASS
 */