function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var editedColumn = e.range.getColumn();
  var approvalColumn = 8; // Column H (Approval Status)
  var timestampColumn = 9; // Column I (Timestamp)
  var emailColumn = 2; // Column B (Requester Email)

  if (editedColumn == approvalColumn) {
    var row = e.range.getRow();
    var status = e.range.getValue();
    var email = sheet.getRange(row, emailColumn).getValue();
    var timestampCell = sheet.getRange(row, timestampColumn);

    // Set timestamp when status changes
    timestampCell.setValue(new Date());

    // Send email notification
    if (status == "Approved" || status == "Rejected") {
      sendEmailNotification(email, status);
    }
  }
}

function sendEmailNotification(email, status) {
  var subject = "IT Change Request - " + status;
  var body = "Your IT Change Request has been " + status + ".\n\nThank you.";
  MailApp.sendEmail(email, subject, body);
}