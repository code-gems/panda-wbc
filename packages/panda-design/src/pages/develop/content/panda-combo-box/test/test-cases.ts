/**
 * CASE 1 - Filtering list with invalid entry
 * 1. Select first item from the drop-down eg: "Alabama"
 * 2. Backspace one character eg. you should be seeing "Alabam" and hit [ENTER]
 * 
 * EXPECTATION:
 * - Combo box should remove the value selected (set to null)
 * - input should be cleared
 * - @change event should be dispatched (value: null)
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 2 - Filtering but not confirming selection
 * 1. Select first item from the drop-down eg: "Alabama"
 * 2. Backspace one character eg. you should be seeing "Alabam"
 * 3. Close drop-down by clicking outside (do not select it with mouse or hit ENTER/TAB)
 * 
 * EXPECTATION:
 * - Selected value should be reverted back to eg. "Alabama"
 * - no new @change event should be dispatched
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 3 - Removing selected value by backspacing it from the input
 * 1. Select any item from the drop-down
 * 2. Backspace everything from input and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched and null value is set
 * - combo box input is cleared
 * 
 * STATUS: ❌ FAIL
 */

/**
 * CASE 4 - No change event dispatched if value did not change
 * 1. Select any item from the drop-down
 * 2. Select the same item from the drop-down
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ❌ FAIL
 */

/**
 * CASE 5 - No change event dispatched if value is cleared again
 * 1. Select any item from the drop-down
 * 2. Backspace everything from input and hit [ENTER]
 * 3. Type some value and backspace it again and hit [ENTER]
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ❌ FAIL
 */

/**
 * CASE 6 - No change event is dispatched is filtering for the same selected item
 * 1. Select any item from the drop-down
 * 2. Searched for the same item and hit [ENTER]
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ❌ FAIL
 */

/**
 * CASE 7 - Select the same value after searching through the list
 * 1. Select any item from the drop-down eg. "Alabama"
 * 2. Search for the same item by typing eg. "Alaba"
 * 3. Select "Alabama" from the drop-down again
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ❌ FAIL
 */

/**
 * CASE 8 - Searching for item that is not part of the selection
 * 1. Select any item from the drop-down eg. "Alabama"
 * 2. Search for the value that does NOT exist on the list and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched with null value
 * - combo box is cleared
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 9 - Searching for items then using arrows for selection and confirming with [ENTER]
 * 1. Type in "ca" to see search results on the drop-down
 * 2. Navigate to California with up/down arrows and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched with CA value
 * - combo box input shows "California"
 * 
 * STATUS: ❌ FAIL
 */

/**
 * CASE 10 - Searching for items then using arrows for selection and clicking outside of drop-down
 * 1. Type in "ca" to see search results on the drop-down
 * 2. Navigate to California with up/down arrows and click outside of drop-down
 * 
 * EXPECTATION:
 * - @change event is dispatched with CA value
 * - combo box input shows "California"
 * 
 * STATUS: ❌ FAIL
 */
