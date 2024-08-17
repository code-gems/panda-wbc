/**
 * Status can be:
 * STATUS: ❌ FAIL
 * STATUS: ✅ PASS
 */


/**
 * CASE 1 - Typing in value from the list 
 * 1. Type in "Alaska" and click outside of the dropdown to close it
 * 
 * EXPECTATION:
 * - @change event should be dispatched (value: AK)
 * - input should show "Alaska"
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 2 - Typing in value from the list and confirm with [ENTER] 
 * 1. Type in "Alaska" and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event should be dispatched (value: AK)
 * - input should show "Alaska"
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 3 - Filtering list with invalid entry
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
 * CASE 4 - Filtering but not confirming selection
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
 * CASE 5 - Removing selected value by backspacing it from the input
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
 * CASE 6 - No change event dispatched if value did not change
 * 1. Select any item from the dropdown
 * 2. Select the same item from the dropdown
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 7 - No change event dispatched if value is cleared again
 * 1. Select any item from the dropdown
 * 2. Backspace everything from input and hit [ENTER]
 * 3. Type some value and backspace it again and hit [ENTER]
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 8 - No change event is dispatched if filtering for the same selected item
 * 1. Select any item from the dropdown
 * 2. Searched for the same item and hit [ENTER]
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 9 - Select the same value after searching through the list
 * 1. Select any item from the dropdown eg. "Alabama"
 * 2. Search for the same item by typing eg. "Alaba"
 * 3. Select "Alabama" from the dropdown again
 * 
 * EXPECTATION: no @change event is dispatched second time
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 10 - Searching for item that is not part of the selection
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
 * CASE 11 - Searching for items then using arrows for selection and confirming with [ENTER]
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
 * CASE 12 - Searching for items then using arrows for selection and clicking outside of dropdown
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
 * CASE 13 - Searching for items then selecting not the first filtered item
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
 * CASE 14 - Show/Scroll to selected item in the dropdown after opening dropdown
 * 1. Using up/down arrow keys select last item on the list and hit [ENTER]
 * 2. Open dropdown again
 * 
 * EXPECTATION:
 * - Dropdown list is scrolled to show last item the second time you open dropdown
 * - Selected item is visually marked as selected
 * 
 * STATUS: ✅ PASS
 */

/**
 * CASE 15 - Cancel selection by pressing [ESC]
 * 1. Navigate dropdown by using up/down arrow keys but don't select anything
 * 2. Press [ESC] to close dropdown
 * 
 * EXPECTATION:
 * - no @change event is dispatched
 * - combo box input is empty
 * - dropdown is closed
 * 
 * STATUS: ✅ PASS
 */


// ====================================================================================================================
// FEATURE TESTING ====================================================================================================
// ====================================================================================================================

// ALLOW CUSTOM VALUES FEATURE

/**
 * CASE 16 - User can enter custom value
 * 1. Type in any value that is not part of the dropdown list and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched and value is set to entered by user
 * - combo box shows user entered value
 * 
 * ENABLED FEATURES:
 * - allow-custom-value
 * 
 * STATUS: ✅ PASS
*/

/**
 * CASE 17 - User can select item from the dropdown
 * 1. Select first item from the dropdown eg: "Alabama"
 * 
 * EXPECTATION:
 * - @change event is dispatched and value (AL) is set
 * - combo box shows "Alabama"
 * 
 * ENABLED FEATURES:
 * - allow-custom-value
 * 
 * STATUS: ✅ PASS
*/

/**
 * CASE 18 - User can search and select existing item from dropdown
 * 1. Type in "Alaska" and hit [ENTER] to select item from dropdown
 * 
 * EXPECTATION:
 * - @change event is dispatched and value (AK) is set
 * - combo box shows "Alaska"
 * 
 * ENABLED FEATURES:
 * - allow-custom-value
 * 
 * STATUS: ✅ PASS
*/

/**
 * CASE 19 - User can remove currently selected item by backspacing it
 * 1. Select first item from the dropdown eg: "Alabama"
 * 2. Backspace entire value and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched and value (null) is set
 * - combo box is empty
 * 
 * ENABLED FEATURES:
 * - allow-custom-value
 * 
 * STATUS: ✅ PASS
*/

// DISABLE AUTO OPEN FEATURE

/**
 * CASE 20 - User can type in value that exists on the list and hit ENTER
 * 1. Type in "Alaska" and hit [ENTER]
 * 
 * EXPECTATION:
 * - @change event is dispatched and value is set (AK)
 * - combo box shows "Alaska"
 * 
 * ENABLED FEATURES:
 * - disable-auto-open
 * 
 * STATUS: ✅ PASS
*/

/**
 * CASE 21 - User can type in value that exists on the list and click outside
 * 1. Type in "Alaska" and click outside of the field
 * 
 * EXPECTATION:
 * - @change event is dispatched and value is set (AK)
 * - combo box shows "Alaska"
 * 
 * ENABLED FEATURES:
 * - disable-auto-open
 * 
 * STATUS: ✅ PASS
*/

/**
 * CASE 22 - User can type in value that exists on the list and click outside
 * 1. Type in "Ohio" and click outside of the field
 * 
 * EXPECTATION:
 * - @change event is dispatched and value is set (AK)
 * - combo box shows "Ohio"
 * 
 * ENABLED FEATURES:
 * - disable-auto-open
 * 
 * STATUS: ✅ PASS
*/
