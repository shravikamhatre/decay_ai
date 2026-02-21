import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
import https from 'node:https'

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    global: {
      fetch: (url, options) => {
        return fetch(url, {
          ...options,
          agent: new https.Agent({ family: 4 })
        })
      }
    }
  }
)
