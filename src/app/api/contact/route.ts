import { NextResponse } from 'next/server';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { sendContactEmails } from '@/lib/email-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // 1. Save message to Supabase database table
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error } = await supabase.from('contact_messages').insert([
        {
          name,
          email,
          subject,
          message,
          status: 'unread',
        },
      ]);

      if (error) {
        console.error('Supabase contact insert error:', error);
      }
    }

    // 2. Automate Email Sending (Gmail Notification to Raj + Auto-Reply to Visitor with CTAs)
    await sendContactEmails({ name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Your message has been received successfully. A confirmation email has been sent to your inbox.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing contact message.' },
      { status: 500 }
    );
  }
}
