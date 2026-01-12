import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase';

// GET - Fetch all content or specific content type
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type'); // classes, events, shop, partners, trainers, amenities, pricing, footer, collaborations, hero

    let supabase;
    try {
      supabase = createServerClient();
    } catch (error) {
      console.error('Supabase client creation error:', error);
      return NextResponse.json(
        { error: 'Database not configured. Please set up Supabase environment variables.' },
        { status: 500 }
      );
    }

    if (contentType) {
      // Fetch specific content type
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', contentType)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Parse the data field (stored as JSON)
      const parsedData = data.map(item => ({
        ...item.data,
        id: item.id,
      }));

      // For single objects (footer, hero), return as array for consistency
      return NextResponse.json(parsedData);
    } else {
      // Fetch all content
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Group by type
      const grouped: Record<string, unknown> = {};
      data.forEach(item => {
        // For single objects (hero, footer), store as object, not array
        if (item.type === 'hero' || item.type === 'footer') {
          grouped[item.type] = {
            ...item.data,
            id: item.id,
          };
        } else {
          // For arrays (classes, events, etc.), store as array
          if (!grouped[item.type]) {
            grouped[item.type] = [];
          }
          grouped[item.type].push({
            ...item.data,
            id: item.id,
          });
        }
      });

      return NextResponse.json(grouped);
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// POST - Save content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data: contentData } = body;

    if (!type || !contentData) {
      return NextResponse.json(
        { error: 'Type and data are required' },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = createServerClient();
    } catch (error) {
      console.error('Supabase client creation error:', error);
      return NextResponse.json(
        { error: 'Database not configured. Please set up Supabase environment variables.' },
        { status: 500 }
      );
    }

    // For single objects (footer, hero), update or insert
    if (type === 'footer' || type === 'hero') {
      // Check if record exists
      const { data: existing } = await supabase
        .from('content')
        .select('id')
        .eq('type', type)
        .single();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('content')
          .update({ data: contentData })
          .eq('type', type);

        if (error) {
          console.error('Supabase update error:', error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      } else {
        // Insert new
        const { error } = await supabase
          .from('content')
          .insert({ type, data: contentData });

        if (error) {
          console.error('Supabase insert error:', error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }
    } else {
      // For arrays (classes, events, etc.), replace all
      // First, delete all existing records of this type
      const { error: deleteError } = await supabase
        .from('content')
        .delete()
        .eq('type', type);

      if (deleteError) {
        console.error('Supabase delete error:', deleteError);
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
      }

      // Then insert all new records
      if (Array.isArray(contentData) && contentData.length > 0) {
        const records = contentData.map(item => ({
          type,
          data: item,
        }));

        const { error: insertError } = await supabase
          .from('content')
          .insert(records);

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          return NextResponse.json({ error: insertError.message }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}

