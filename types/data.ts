export interface Note {
  title: string;
  text: string;
  image?: string;
}

export interface Directory {
  name: string;
  notes: Note[];
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  image?: string | null | undefined;
}
