/**
 * Status can be:
 * STATUS: ❌ FAIL
 * STATUS: ✅ PASS
 */


/**
 * CASE 1 - Filtering list with invalid entry
 * 1. Select first item from the dropdown eg: "Alabama"
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
 * 1. Select first item from the dropdown eg: "Alabama"
 * 2. Backspace one character eg. you should be seeing "Alabam"
 * 3. Close dropdown by clicking outside (do not select it with mouse or hit ENTER/TAB)
 * 
 * EXPECTATION:
 * - Selected value should be reverted back to eg. "Alabama"
 * - no new @change event should be dispatched
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 3 - Removing selected value by backspacing it from the input
 * 1. Select any item from the dropdown
 * 2. Backspace everything from input and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched and null value is set
 * - combo box input is cleared
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 4 - No change event dispatched if value did not change
 * 1. Select any item from the dropdown
 * 2. Select the same item from the dropdown
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 5 - No change event dispatched if value is cleared again
 * 1. Select any item from the dropdown
 * 2. Backspace everything from input and hit [ENTER]
 * 3. Type some value and backspace it again and hit [ENTER]
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 6 - No change event is dispatched if filtering for the same selected item
 * 1. Select any item from the dropdown
 * 2. Searched for the same item and hit [ENTER]
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 7 - Select the same value after searching through the list
 * 1. Select any item from the dropdown eg. "Alabama"
 * 2. Search for the same item by typing eg. "Alaba"
 * 3. Select "Alabama" from the dropdown again
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 8 - Searching for item that is not part of the selection
 * 1. Select any item from the dropdown eg. "Alabama"
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
 * 1. Type in "ca" to see search results on the dropdown
 * 2. Navigate to California with up/down arrows and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched with CA value
 * - combo box input shows "California"
 * 
 * STATUS: ✅ PASS
 *

/**
 * CASE 10 - Searching for items then using arrows for selection and clicking outside of dropdown
 * 1. Type in "ca" to see search results on the dropdown
 * 2. Navigate to California with up/down arrows and click outside of dropdown
 * 
 * EXPECTATION:
 * - @change event is dispatched with CA value
 * - combo box input shows "California"
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 11 - Searching for items then selecting not the first filtered item
 * 1. Type in "ca" to see search results on the dropdown
 * 2. Using mouse, click/select "North Carolina"
 * 
 * EXPECTATION:
 * - @change event is dispatched with NC value
 * - combo box input shows "North Carolina"
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 12 - Present selected item in the dropdown after opening dropdown
 * 1. Select combo-box and using up/down arrow keys select any item
 * 2. Using up/down arrow keys open dropdown navigate to selected item
 * 
 * EXPECTATION:
 * - after opening dropdown second time, selected item is visually marked as selected
 * 
 * STATUS: ❌ FAIL
 */

/**
 * CASE 13 - Cancel selection by pressing [ESC]
 * 1. Navigate dropdown by using up/down arrow keys but don't select anything
 * 2. Press [ESC] to close dropdown
 * 
 * EXPECTATION:
 * - no @change event is dispatched
 * - combo box input is empty
 * - dropdown is closed
 * 
 * STATUS: ❌ FAIL
 */
