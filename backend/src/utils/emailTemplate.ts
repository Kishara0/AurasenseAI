export const createAccountTemplate = (userName: string) => {
  return `
    <div style="font-family: Arial; padding: 20px; background:#f4f4f4;">
      <div style="max-width:500px;margin:auto;background:white;padding:20px;border-radius:10px;">
        
        <h2 style="color:#333;">Welcome to AurasenseAI 🎉</h2>
        
        <p>Hello <strong>${userName}</strong>,</p>
        
        <p>Your account has been successfully created.</p>
        
        <p>We’re excited to have you on board 🚀</p>
        
        <hr/>
        
        <p style="font-size:12px;color:#777;">
          If you did not create this account, please contact support.
        </p>
      </div>
    </div>
  `;
};


export const loginTemplate = (userName: string) => {
  return `
    <div style="font-family: Arial; padding: 20px; background:#f4f4f4;">
      <div style="max-width:500px;margin:auto;background:white;padding:20px;border-radius:10px;">
        
        <h2 style="color:#333;">Login Alert 🔐</h2>
        
        <p>Hello <strong>${userName}</strong>,</p>
        
        <p>Your account was just logged in successfully.</p>
        
        <p>If this was you, you can ignore this message.</p>
        
        <p>If not, please secure your account immediately ⚠️</p>
        
        <hr/>
        
        <p style="font-size:12px;color:#777;">
          Stay safe,<br/>AurasenseAI Team
        </p>
      </div>
    </div>
  `;
};