export interface Link {
  id: string;
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string | null;
  created_at: string;
}

export interface CreateLinkRequest {
  target_url: string;
  code?: string;
}

export interface CreateLinkResponse {
  code: string;
  target_url: string;
  short_url: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}
