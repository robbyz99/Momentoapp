import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Database schema types
interface MorningEntry {
  id: number;
  date: string;
  identity?: string;
  feeling?: string;
  action?: string;
  replace?: string;
  why_today_matters?: string;
  starter_action_suggestion_used?: boolean;
  drank_water?: boolean;
  exposed_to_light?: boolean;
  moved_body?: boolean;
  timer_completed?: boolean;
  visualization_completed?: boolean;
  created_at?: string;
}

interface Reflection {
  id: number;
  date: string;
  well_done?: string;
  embodied?: string;
  grateful?: string;
  created_at?: string;
}

interface UserStats {
  id: number;
  current_streak: number;
  total_completions: number;
  last_completion_date?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://glqkmqucggccnxxlbjzq.supabase.co'
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscWttcXVjZ2djY254eGxianpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNTI2OTksImV4cCI6MjA2NzkyODY5OX0.c3lrKS3rvrS6C-nM98bDYrG-xtYTaLHeLIDFY2DQy1g'
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Route handling
    if (path === '/api/user-stats' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('id', 1)
        .single()

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (path.startsWith('/api/morning-entries/date/') && req.method === 'GET') {
      const date = decodeURIComponent(path.split('/').pop() || '')
      const { data, error } = await supabase
        .from('morning_entries')
        .select('*')
        .eq('date', date)
        .single()

      if (error && error.code !== 'PGRST116') {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify(data || null), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (path === '/api/morning-entries' && req.method === 'POST') {
      const body = await req.json()
      const { data, error } = await supabase
        .from('morning_entries')
        .insert(body)
        .select()
        .single()

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (path === '/api/reflections' && req.method === 'GET') {
      const { data, error } = await supabase
        .from('reflections')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (path === '/api/reflections' && req.method === 'POST') {
      const body = await req.json()
      const { data, error } = await supabase
        .from('reflections')
        .insert(body)
        .select()
        .single()

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Default response
    return new Response(JSON.stringify({ message: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}) 