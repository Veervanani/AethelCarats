<?php
/**
 * Aura Diamond Atelier — Hostinger Email / SMTP Dispatcher
 */

function sendAuraEmail(string $toEmail, string $toName, string $subject, string $htmlBody): bool {
    $smtpHost = getenv('SMTP_HOST') ?: 'smtp.hostinger.com';
    $smtpPort = (int) (getenv('SMTP_PORT') ?: 465);
    $smtpUser = getenv('SMTP_USER') ?: 'concierge@auroradiamonds.com';
    $smtpPass = getenv('SMTP_PASS') ?: '';
    $smtpFrom = getenv('SMTP_FROM') ?: '"Aura Diamond Atelier" <concierge@auroradiamonds.com>';

    // Try PHPMailer if vendor exists, or Socket SMTP / mail() fallback
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        try {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = $smtpHost;
            $mail->SMTPAuth   = !empty($smtpPass);
            $mail->Username   = $smtpUser;
            $mail->Password   = $smtpPass;
            $mail->SMTPSecure = $smtpPort === 465 ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $smtpPort;

            $mail->setFrom($smtpUser, 'Aura Diamond Atelier');
            $mail->addAddress($toEmail, $toName);
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $htmlBody;

            return $mail->send();
        } catch (Throwable $e) {
            error_log("PHPMailer send failed: " . $e->getMessage());
        }
    }

    // Native PHP mail() fallback
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$smtpFrom}\r\n";
    $headers .= "Reply-To: {$smtpUser}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return @mail($toEmail, $subject, $htmlBody, $headers);
}
