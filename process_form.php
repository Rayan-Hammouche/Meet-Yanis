<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$geolocation = $_POST['geolocation'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO messages (name, email, message, geolocation) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $message, $geolocation);

// Execute the query
if ($stmt->execute()) {
    echo "Message sent successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>