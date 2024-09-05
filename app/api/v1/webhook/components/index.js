export const generateOrderEmailContent = (
  orderDetails,
  products,
  isSuccess = true
) => {
  const orderSummary = products
    ? products
        .map(
          (product) => `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${
                product.name
              }</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${
                product.quantity
              }</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${(
                product.price / 100
              ).toFixed(2)}</td>
            </tr>`
        )
        .join("")
    : "";

  const addressData = orderDetails.address
    ? JSON.parse(orderDetails.address)[0]
    : {};

  return isSuccess
    ? `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .address p {
            margin: 0;
            padding: 5px 0;
          }
          .address h3 {
            margin: 10px 0 5px;
            font-size: 18px;
          }
          .footer {
            margin-top: 20px;
            font-size: 16px;
            color: #555;
            text-align: center;
          }
          .user-name {
            font-weight: bold;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 style="color: #333; text-align: center;">Thank You for Your Purchase!</h2>
          <p style="text-align: center;">Hi <span class="user-name">${
            orderDetails.username
          }</span>,</p>
          <p style="text-align: center;">We appreciate your business. Here are the details of your order:</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th style="padding: 10px; background-color: #f4f4f4; border-bottom: 2px solid #ddd; text-align: left;">Product</th>
                <th style="padding: 10px; background-color: #f4f4f4; border-bottom: 2px solid #ddd; text-align: center;">Quantity</th>
                <th style="padding: 10px; background-color: #f4f4f4; border-bottom: 2px solid #ddd; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${orderSummary}
            </tbody>
          </table>

          <p style="font-size: 20px; font-weight: bold; text-align: right;">Total Price: $${(
            orderDetails.price / 100
          ).toFixed(2)}</p>

          <div class="address">
            <h3>Shipping Address:</h3>
            <p>${addressData.street}</p>
            ${addressData.apt ? `<p>Apt ${addressData.apt}</p>` : ""}
            <p>${addressData.city}, ${addressData.state}</p>
            <p>${addressData.country}, ${addressData.zipcode}</p>
          </div>

          <div class="footer">
            <p>Thank you for choosing us!</p>
            <p>Best regards,<br><strong>Store Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `
    : `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .footer {
            margin-top: 20px;
            font-size: 16px;
            color: #555;
            text-align: center;
          }
          .user-name, .imp {
            font-weight: bold;
            font-size: 18px;
          }
          
        </style>
      </head>
      <body>
        <div class="container">
          <h2 style="color: #333; text-align: center;">Order Processing Issue</h2>
          <p style="text-align: center;">Dear <span class="user-name">${orderDetails.username}</span>,</p>
          <p style="text-align: center;">We regret to inform you that we encountered an issue while processing your order. As a result, your payment has been automatically canceled for your security.</p>
          <p style="text-align: center;">Please rest assured that no charges have been made to your account. If you would like to try again or need assistance, our support team is here to help.</p>
          <p style="text-align: center;">Feel free to reach out to us at <span class="imp"> +9779861142179 </span>for any questions or concerns. We apologize for any inconvenience this may have caused and appreciate your understanding.</p>
          <div class="footer">
            <p>Thank you for choosing us!</p>
            <p>Best regards,<br><strong>Store Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
};
