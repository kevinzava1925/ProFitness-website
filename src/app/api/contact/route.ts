import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServerClient } from '@/utils/supabase';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = createServerClient();
    const { data: messageData, error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone: phone || null,
        subject,
        message,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }

    // Get all active recipient emails
    const { data: recipients, error: recipientsError } = await supabase
      .from('contact_recipients')
      .select('email')
      .eq('is_active', true);

    if (recipientsError) {
      console.error('Error fetching recipients:', recipientsError);
    }

    // Send email to all recipients (or fallback to CONTACT_EMAIL)
    const recipientEmails = recipients && recipients.length > 0
      ? recipients.map(r => r.email)
      : (process.env.CONTACT_EMAIL ? [process.env.CONTACT_EMAIL] : []);

    // Only send email if Resend is configured and we have recipients
    if (resend && recipientEmails.length > 0) {
      try {
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Contact Form <onboarding@resend.dev>',
          to: recipientEmails,
          replyTo: email,
          subject: `Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">This message was submitted through the ProFitness contact form.</p>
          `,
        });

        if (emailError) {
          console.error('Resend error:', emailError);
          // Don't fail the request if email fails - message is already saved
        }
      } catch (emailErr) {
        console.error('Email sending error:', emailErr);
        // Continue even if email fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      messageId: messageData.id 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

