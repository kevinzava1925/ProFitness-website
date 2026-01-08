import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('contact_recipients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recipients:', error);
      return NextResponse.json(
        { error: 'Failed to fetch recipients' },
        { status: 500 }
      );
    }

    return NextResponse.json({ recipients: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipients' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('contact_recipients')
      .insert({ email: email.toLowerCase().trim() })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
      console.error('Error adding recipient:', error);
      return NextResponse.json(
        { error: 'Failed to add recipient' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, recipient: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to add recipient' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recipientId = searchParams.get('id');

    if (!recipientId) {
      return NextResponse.json(
        { error: 'Recipient ID is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from('contact_recipients')
      .delete()
      .eq('id', recipientId);

    if (error) {
      console.error('Error deleting recipient:', error);
      return NextResponse.json(
        { error: 'Failed to delete recipient' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete recipient' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, is_active } = await request.json();

    if (!id || typeof is_active !== 'boolean') {
      return NextResponse.json(
        { error: 'ID and is_active status are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from('contact_recipients')
      .update({ is_active })
      .eq('id', id);

    if (error) {
      console.error('Error updating recipient:', error);
      return NextResponse.json(
        { error: 'Failed to update recipient' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to update recipient' },
      { status: 500 }
    );
  }
}

