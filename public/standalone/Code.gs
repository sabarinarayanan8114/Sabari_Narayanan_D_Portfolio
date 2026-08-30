/**
 * ============================================================================
 * Google Apps Script Web App Backend for Sabari Narayanan Portfolio
 * Database: Google Sheets (Spreadsheet)
 * ============================================================================
 * 
 * Features:
 * 1. Automatically initializes the 'Submissions' sheet with styled headers if empty.
 * 2. Receives POST requests containing Name, Email, Subject, and Message.
 * 3. Appends records into Google Sheets database with ISO Timestamps and 'NEW' status.
 * 4. Sends immediate lead notification email directly to dsabari2408@gmail.com.
 * 5. Returns JSON response with HTTP status code for CORS-compliant clients.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 10-second lock prevents race conditions on concurrent submissions

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Submissions');
    
    if (!sheet) {
      sheet = doc.insertSheet('Submissions');
    }

    // Auto-create and format header row on first run
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Status']);
      var headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#0f172a');
      headerRange.setFontColor('#38bdf8');
      sheet.setFrozenRows(1);
    }

    // Parse parameters from form-data or JSON payload
    var data = e.parameter || {};
    if (e.postData && e.postData.contents) {
      try {
        var jsonData = JSON.parse(e.postData.contents);
        for (var key in jsonData) {
          data[key] = jsonData[key];
        }
      } catch (err) {
        // Fall back to urlencoded parameters
      }
    }

    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    var name = (data.name || 'Anonymous Recruiter').trim();
    var email = (data.email || 'No email provided').trim();
    var subject = (data.subject || 'Portfolio Inquiry').trim();
    var message = (data.message || '').trim();

    // Append new row into Google Sheets Database
    sheet.appendRow([formattedDate, name, email, subject, message, 'NEW']);

    // Send instant Email Notification to Sabari Narayanan
    try {
      MailApp.sendEmail({
        to: 'dsabari2408@gmail.com',
        subject: '[Portfolio Lead] ' + subject + ' - ' + name,
        body: 'New Portfolio Contact Form Submission Received!\n\n' +
              '=================================================\n' +
              'Sender Name : ' + name + '\n' +
              'Sender Email: ' + email + '\n' +
              'Topic/Role  : ' + subject + '\n' +
              'Submitted At: ' + formattedDate + '\n' +
              '=================================================\n\n' +
              'Message Content:\n' + message + '\n\n' +
              'Google Sheet Database URL:\n' + doc.getUrl()
      });
    } catch (mailErr) {
      Logger.log('Mail Notification Error: ' + mailErr.toString());
    }

    // Return JSON response
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      row: sheet.getLastRow(),
      timestamp: formattedDate,
      message: 'Your message has been securely recorded in Google Sheets database and forwarded to Sabari Narayanan.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    service: 'Google Apps Script & Google Sheets Database Backend',
    owner: 'Sabari Narayanan D (dsabari2408@gmail.com)',
    endpoints: {
      post: 'Send form data (name, email, subject, message) to append to database'
    }
  })).setMimeType(ContentService.MimeType.JSON);
}
