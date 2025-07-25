export const projectInvitationTemplate = (project) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Invitation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
        
        <div style="text-align: center; padding: 20px 0; border-bottom: 1px solid #eee;">
          <h1 style="color: #333; margin: 0;">Project Invitation</h1>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">You've been invited to join "${
            project.name
          }"!</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Project Details:</h3>
            <p style="color: #666; margin: 5px 0;"><strong>Project Name:</strong> ${
              project.name
            }</p>
            ${
              project.description
                ? `<p style="color: #666; margin: 5px 0;"><strong>Description:</strong> ${project.description}</p>`
                : ""
            }
            <p style="color: #666; margin: 5px 0;"><strong>Project Owner:</strong> ${
              project.owner.name
            }</p>
            <p style="color: #666; margin: 5px 0;"><strong>Current Members:</strong> ${
              project.members.length
            }</p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            You have been invited to collaborate on this project. Click the button below to accept the invitation and start working with the team.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" 
               style="display: inline-block; 
                      background-color: #007bff; 
                      color: #ffffff; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      font-weight: bold;
                      font-size: 16px;">
              Accept Invitation
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.5; margin-top: 30px;">
            If you're having trouble clicking the button, copy and paste this link into your browser:<br>
            <span style="color: #007bff;">[INVITATION_LINK_HERE]</span>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          <p>This invitation was sent from our Task Manager application.</p>
        </div>
        
      </div>
    </body>
    </html>
  `;
};
