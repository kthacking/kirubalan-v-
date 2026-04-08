import { supabase } from './lib/supabase';


// This holds the dynamic assets pulled from Supabase.
// It will be exported to all components exactly how statically generated keys were.
export const assetsMap: Record<string, string> = {};

export async function fetchAssetsMap() {
    try {
        const { data, error } = await supabase.from('assets').select('*');
        if (error) {
            console.error('Error fetching dynamic assets:', error);
            return;
        }

        if (data) {
            data.forEach(asset => {
                let key = asset.name;
                key = key.replace(/[^a-zA-Z0-9]/g, ' ')
                         .split(/\s+/)
                         .filter(x => x)
                         .map((w: string, i: number) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                         .join('');
                
                // Keep deduplication logic
                let counter = 1;
                let originalKey = key;
                while (assetsMap[key] && assetsMap[key] !== asset.url) {
                    key = originalKey + counter;
                    counter++;
                }

                assetsMap[key] = asset.url;
            });
        }
    } catch (err) {
        console.error('Failed to init assetsMap dynamically', err);
    }
}
