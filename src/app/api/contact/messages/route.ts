import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase';
import { requireAdmin } from '@/utils/auth';

export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin(request);
    
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin(request);
    
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('id');

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    // Validate messageId format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(messageId)) {
      return NextResponse.json(
        { error: 'Invalid message ID format' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.error('Error deleting message:', error);
      return NextResponse.json(
        { error: 'Failed to delete message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}


