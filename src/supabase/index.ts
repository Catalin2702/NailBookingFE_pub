import {createClient} from '@supabase/supabase-js'
import {iOptions} from "@/utils/interfaces";

const supabaseUrl = String(process.env.VUE_APP_SUPABASE_URL)
const supabaseKey = String(process.env.VUE_APP_SUPABASE_KEY)
const bucket = String(process.env.VUE_APP_SUPABASE_MEDIA_BUCKET)

const supabase = createClient(supabaseUrl, supabaseKey)

const storage = supabase.storage.from(bucket)

const getPublicUrl = (path: string, options?: iOptions | undefined) => storage.getPublicUrl(path, options).data.publicUrl

export{
	supabase,
	bucket,
	storage,
	getPublicUrl,
}
