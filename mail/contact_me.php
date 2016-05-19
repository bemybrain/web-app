<?php
// Check for empty fields
if(empty($_POST['nome'])  		||
   empty($_POST['email']) 		||
   empty($_POST['usuario']) 		||
   empty($_POST['senha'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$nome = $_POST['nome'];
$email_address = $_POST['email'];
$usuario = $_POST['usuario'];
$senha = $_POST['senha'];
	
// Create the email and send the senha
$to = 'yournome@yourdomain.com'; // Add your email address inbetween the '' replacing yournome@yourdomain.com - This is where the form will send a senha to.
$email_subject = "Website Contact Form:  $nome";
$email_body = "You have received a new senha from your website contact form.\n\n"."Here are the details:\n\nnome: $nome\n\nEmail: $email_address\n\nusuario: $usuario\n\nsenha:\n$senha";
$headers = "From: noreply@yourdomain.com\n"; // This is the email address the generated senha will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>