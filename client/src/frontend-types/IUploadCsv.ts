import { FormEvent } from "react";

export interface IUploadCsv extends FormEvent {
  format: string;
  selectedFile: string;
  selectedFileName: string;
}
