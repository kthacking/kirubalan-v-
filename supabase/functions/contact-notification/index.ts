import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

serve(async (req) => {
  try {
    const { record } = await req.json()

    console.log(`Received new contact: ${record.name} (${record.email})`)

    const htmlContent = `
      <html>
        <body style="font-family: 'Inter', sans-serif; color: #1a1a1a; line-height: 1.6; background-color: #f4f7f6; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e1e4e8;">
            <div style="background: #000000; color: #ffffff; padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase;">REDFOX INQUIRY</h1>
              <p style="margin: 10px 0 0; font-size: 13px; opacity: 0.7; letter-spacing: 1px;">New transmission detected from your portfolio</p>
            </div>
            
            <div style="padding: 40px;">
              <div style="margin-bottom: 30px;">
                <p style="margin: 0 0 5px; font-size: 11px; font-weight: 900; color: #6e7681; text-transform: uppercase; letter-spacing: 1px;">Sender Details</p>
                <h2 style="margin: 0; font-size: 20px; font-weight: 700;">${record.name}</h2>
                <a href="mailto:${record.email}" style="color: #0052cc; text-decoration: none; font-size: 14px;">${record.email}</a>
              </div>

              <div style="background: #f8f9fa; border-radius: 12px; padding: 25px; border-left: 4px solid #000;">
                <p style="margin: 0 0 15px; font-size: 11px; font-weight: 900; color: #6e7681; text-transform: uppercase; letter-spacing: 1px;">Inquiry Brief</p>
                <p style="margin: 0; font-size: 15px; color: #24292f; white-space: pre-wrap;">${record.message}</p>
              </div>

              <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="margin: 0; font-size: 11px; color: #6e7681;">Timestamp</p>
                  <p style="margin: 0; font-size: 12px; font-weight: 600;">${new Date(record.created_at).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
                </div>
              </div>
            </div>

            <div style="background: #fafbfc; padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
              <p style="margin: 0; font-size: 11px; color: #8c959f;">
                This is an automated priority alert from the <strong style="color: #000;">Redfox Ecosystem Protocol</strong>.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Redfox Portfolio <onboarding@resend.dev>",
        to: ["kirubalan220@gmail.com"],
        subject: `🔥 Priority: New Inquiry from ${record.name}`,
        html: htmlContent,
      }),
    })

    const responseData = await res.json()
    console.log("Resend API response:", responseData)

    return new Response(JSON.stringify(responseData), { 
      status: res.status,
      headers: { "Content-Type": "application/json" } 
    })
  } catch (error) {
    console.error("Function error:", error)
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    })
  }
})
