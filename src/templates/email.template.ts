export const OTP_TEMPLATES = (template: string, OTP: string) => {
  if (template === 't1') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
          }
          .header h1 {
            color: #333333;
            margin: 0;
          }
          .content {
            text-align: center;
            padding: 20px 0;
          }
          .otp {
            font-size: 36px;
            font-weight: bold;
            color: #2c3e50;
            margin: 20px 0;
            letter-spacing: 5px;
          }
          .content p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
          }
          .footer {
            text-align: center;
            padding: 20px 0;
            color: #999999;
            font-size: 14px;
          }
          @media (max-width: 600px) {
            .container {
              margin: 10px;
              padding: 10px;
            }
            .otp {
              font-size: 28px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Celevery</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <div class="otp">${OTP}</div>
            <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
          </div>
          <div class="footer">
            <p>© 2025 Celevery. All rights reserved.</p>
            <p>Contact us at support@bigburry.com</p>
          </div>
        </div>
      </body>
      </html>`;
  } else if (template === 't2') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Celevery OTP Code</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #ffe6f0;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: linear-gradient(135deg, #fff0f5, #e6f7ff);
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border: 2px solid #ffd700;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      background: url('https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80') no-repeat center;
      background-size: cover;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      color: #d81b60;
      margin: 0;
      font-size: 28px;
      text-shadow: 1px 1px 2px #ffffff;
    }
    .content {
      text-align: center;
      padding: 20px;
    }
    .otp {
      font-size: 36px;
      font-weight: bold;
      color: #c2185b;
      margin: 20px 0;
      letter-spacing: 6px;
      background-color: #fff3e0;
      padding: 10px;
      border-radius: 8px;
      display: inline-block;
    }
    .content p {
      color: #333333;
      font-size: 16px;
      line-height: 1.6;
    }
    .celebration-images {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }
    .celebration-images img {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      object-fit: cover;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666666;
      font-size: 14px;
      background-color: #f8bbd0;
      border-radius: 0 0 10px 10px;
    }
    @media (max-width: 600px) {
      .container {
        margin: 10px;
        padding: 10px;
      }
      .otp {
        font-size: 28px;
        letter-spacing: 4px;
      }
      .celebration-images img {
        width: 80px;
        height: 80px;
      }
      .header h1 {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Celevery</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Let’s get the celebration started! Your One-Time Password (OTP) is:</p>
      <div class="otp">${OTP}</div>
      <p>This OTP is valid for 10 minutes. Keep it safe and don’t share it!</p>
      <div class="celebration-images">
        <img src="https://images.unsplash.com/photo-1562440498-6e3b80f42f01?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Celebration Cake">
        <img src="https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Balloons">
      </div>
    </div>
    <div class="footer">
      <p>© 2025 Celevery. All rights reserved.</p>
      <p>Contact us at <a href="mailto:support@bigburry.com" style="color: #d81b60;">support@bigburry.com</a></p>
    </div>
  </div>
</body>
</html>`;
  }
};
