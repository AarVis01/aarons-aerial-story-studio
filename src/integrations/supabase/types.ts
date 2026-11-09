export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          budget: string | null
          business_name: string | null
          contact_method: string | null
          created_at: string
          details: string
          email: string
          email_status: string
          id: string
          ip_hash: string | null
          location: string
          name: string
          phone: string | null
          service: string | null
          status: string
          terms_accepted_at: string | null
          terms_version: string | null
        }
        Insert: {
          budget?: string | null
          business_name?: string | null
          contact_method?: string | null
          created_at?: string
          details: string
          email: string
          email_status?: string
          id?: string
          ip_hash?: string | null
          location: string
          name: string
          phone?: string | null
          service?: string | null
          status?: string
          terms_accepted_at?: string | null
          terms_version?: string | null
        }
        Update: {
          budget?: string | null
          business_name?: string | null
          contact_method?: string | null
          created_at?: string
          details?: string
          email?: string
          email_status?: string
          id?: string
          ip_hash?: string | null
          location?: string
          name?: string
          phone?: string | null
          service?: string | null
          status?: string
          terms_accepted_at?: string | null
          terms_version?: string | null
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt: string
          created_at: string
          id: string
          kind: string
          mime: string | null
          path: string
          size: number | null
          url: string
        }
        Insert: {
          alt?: string
          created_at?: string
          id?: string
          kind?: string
          mime?: string | null
          path: string
          size?: number | null
          url: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: string
          kind?: string
          mime?: string | null
          path?: string
          size?: number | null
          url?: string
        }
        Relationships: []
      }
      project_media: {
        Row: {
          alt: string
          caption: string
          created_at: string
          id: string
          kind: string
          poster_url: string | null
          project_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string
          caption?: string
          created_at?: string
          id?: string
          kind?: string
          poster_url?: string | null
          project_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string
          caption?: string
          created_at?: string
          id?: string
          kind?: string
          poster_url?: string | null
          project_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category_id: string | null
          client_name: string | null
          cover_video_url: string | null
          created_at: string
          external_url: string | null
          featured: boolean
          featured_order: number
          full_description: string
          id: string
          instagram_url: string | null
          is_placeholder: boolean
          project_date: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string
          slug: string
          sort_order: number
          status: string
          thumbnail_alt: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          client_name?: string | null
          cover_video_url?: string | null
          created_at?: string
          external_url?: string | null
          featured?: boolean
          featured_order?: number
          full_description?: string
          id?: string
          instagram_url?: string | null
          is_placeholder?: boolean
          project_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string
          slug: string
          sort_order?: number
          status?: string
          thumbnail_alt?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          client_name?: string | null
          cover_video_url?: string | null
          created_at?: string
          external_url?: string | null
          featured?: boolean
          featured_order?: number
          full_description?: string
          id?: string
          instagram_url?: string | null
          is_placeholder?: boolean
          project_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string
          slug?: string
          sort_order?: number
          status?: string
          thumbnail_alt?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          body: string
          button_label: string
          button_url: string | null
          created_at: string
          id: string
          image_alt: string
          image_url: string | null
          og_image: string | null
          published: boolean
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          summary: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          body?: string
          button_label?: string
          button_url?: string | null
          created_at?: string
          id?: string
          image_alt?: string
          image_url?: string | null
          og_image?: string | null
          published?: boolean
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          summary?: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          body?: string
          button_label?: string
          button_url?: string | null
          created_at?: string
          id?: string
          image_alt?: string
          image_url?: string | null
          og_image?: string | null
          published?: boolean
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          summary?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          draft: Json
          key: string
          published: Json
          published_at: string | null
          updated_at: string
        }
        Insert: {
          draft?: Json
          key: string
          published?: Json
          published_at?: string | null
          updated_at?: string
        }
        Update: {
          draft?: Json
          key?: string
          published?: Json
          published_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_published_content: {
        Args: never
        Returns: {
          content: Json
          key: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
