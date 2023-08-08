export interface Branchs {
  name: string;
  merged: boolean;
  protected: boolean;
  default: boolean;
  developers_can_push: boolean;
  developers_can_merge: boolean;
  can_push: boolean;
  web_url: string;
  commit: {};
}

export interface Commits {
  id: string;
  mensagem: string;
  autor: string;
  data: string;
}
