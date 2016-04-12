function cash (withdraw_amount) {
  var available_notes = [100, 50, 20, 10];
  var errors = {
    invalid: 'InvalidArgumentException',
    missingNote: 'NoteUnavailableException'
  };
  var withdraw_notes = {};
  var return_obj = {
    success: null,
    notes: {}
  };

  if (!Number.isInteger(withdraw_amount) || withdraw_amount < 0) {
    return_obj = {
      success: false,
      message: errors.invalid
    };
    return return_obj;
  }

  for (var i = 0; i < available_notes.length; i++) {
    var note = available_notes[i];
    if (parseInt(withdraw_amount / note) >= 1) {
      withdraw_notes[note] = parseInt(withdraw_amount / note);
      withdraw_amount = withdraw_amount - withdraw_notes[note] * note;
    }
  }

  if (withdraw_amount > 0) {
    return_obj = {
      success: false,
      message: errors.missingNote
    };
    return return_obj;
  } else {
    return_obj = {
      success: true,
      message: '',
      notes: withdraw_notes
    };
    return return_obj;
  }
}

var withdraw_list_test = [30, 80, 125, -130, null, 'aa', 1.2, '140', 226, 500, 580];

for (var i = 0; i < withdraw_list_test.length; i++) {
  console.group('Trying:', withdraw_list_test[i]);
  var result = cash(withdraw_list_test[i]);
  console.log(result);
  console.groupEnd();
}