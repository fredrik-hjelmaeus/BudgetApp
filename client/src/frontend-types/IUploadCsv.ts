import { FormEvent } from "react";

export interface IUploadCsv extends FormData {
  format: string;
  selectedFile: string;
  selectedFileName: string;
}
