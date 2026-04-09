import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// 이미지 업로드 (Supabase Storage)
export const uploadImage = async (file: File): Promise<string> => {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(`posts/${fileName}`, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("blog-images")
    .getPublicUrl(`posts/${fileName}`);

  return data.publicUrl;
};
