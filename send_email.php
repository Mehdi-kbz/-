<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $to = 'khabouzemehdi@outlook.com';
  $subject = 'New Message from Your Portfolio Website';

  $headers = "From: $name <$email>" . "\r\n";
  $headers .= "Reply-To: $email" . "\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

  $mailBody = "Name: $name<br>Email: $email<br>Message: $message";

  mail($to, $subject, $mailBody, $headers);

  // Respond to the client-side JavaScript
  header('Content-Type: application/json');
  echo json_encode(['status' => 'success']);
} else {
  // Handle invalid requests
  header('HTTP/1.1 400 Bad Request');
  echo 'Invalid request';
}
?>
