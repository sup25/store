export const generateComplaintEmailContent = (userEmail, complaintMessage) => {
  return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f7f7f7;
            }
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            h2 {
              color: #333333;
            }
            p {
              font-size: 16px;
              color: #555555;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table td {
              padding: 10px;
              border-bottom: 1px solid #dddddd;
              vertical-align: top;
            }
            table td strong {
              color: #333333;
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #999999;
              text-align: center;
            }
            @media (max-width: 600px) {
              .email-container {
                padding: 10px;
              }
              table td {
                padding: 8px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">            
            <p>Hello,</p>
            <p>A new complaint has been submitted with the following details:</p>
            <table>
              <tr>
                <td><strong>Submitted by:</strong></td>
                <td>${userEmail}</td>
              </tr>
              <tr>
                <td><strong>Complaint:</strong></td>
                <td>${complaintMessage}</td>
              </tr>
            </table>
            <p class="footer">Thank you,<br>Store Team</p>
          </div>
        </body>
      </html>
    `;
};
