# Manual test cases
------

## Case 1 - User enters date manually
### Arrange:
1. Date picker is initialized with no value

### Act:
1. Enter `02-01-2026` to the input field

### Assert:
1. Date picker displays `2026-02-01`
1. Date picker dialog is shown with correctly selected value of `Jan 2nd 2026` 
1. `@change` event is triggered with value `2026-02-01`


## Case 2 - User enters date manually in a different format
### Arrange:
1. Date picker is initialized with no value

### Act:
1. Enter `14 Feb 2026` to the input field

### Assert:
1. Date picker displays `2026-02-14`
1. Date picker dialog is shown with correctly selected value of `14th Feb 2026` 
1. `@change` event is triggered with value `2026-02-14`


## Case 3 - Date picker reformats entered date to the set format
### Arrange:
1. Date picker is initialized with no value
1. Date picker format attribute is set to `DD MMM YYYY`

### Act:
1. Enter `2026-01-24` to the input field

### Assert:
1. Date picker displays `24 Jan 2026`
1. Date picker dialog is shown with correctly selected value of `24th Jan 2026` 
1. `@change` event is triggered with value `2026-01-24`


## Case 4 - User clears selected date by clicking ***clear button***
### Arrange:
1. Date picker is initialized with value `2026-22-02`
1. `show-clear-button` attribute is set

### Act:
1. Click on `clear button`

### Assert:
1. Date picker displays empty field
1. Date picker dialog shown no selected date
1. `@change` event is triggered with `null` value


## Case 5 - Date is set programmatically
### Arrange:
1. Date picker is initialized with no value
1. Date `2026-22-02` is set via property to the date picker

### Act:
1. no action

### Assert:
1. Date picker displays date `2026-22-02`
1. no `@change` event is triggered


## Case 6 - Date picker blur event does not trigger change event if date value did not change
### Arrange:
1. Date picker is initialized with no value
1. Date `2026-22-02` is set via property to the date picker

### Act:
1. Click on the input
1. click outside of the component to trigger `blur` event

### Assert:
1. Date picker displays date `2026-22-02`
1. no `@change` event is triggered
