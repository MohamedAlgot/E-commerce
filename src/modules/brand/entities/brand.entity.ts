import { Types } from "mongoose";

export class Brand {
  name!: string;
  logo!: string;
  folderId!: string;
  slug!: string;
  categoryId!: Types.ObjectId[];
}
