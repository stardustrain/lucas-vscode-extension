import { extname } from 'node:path';

const ALLOWED_EXTNAMES = ['.ts', '.js', '.tsx', '.jsx', '.css', 'scss', 'graphql'];

type FileNameParams = {
  directory: string;
  fileName: string;
};

export class FileMeta {
  private readonly directory: string;
  private readonly fileName: string;
  private readonly metaData: {fileName: string, template: string}[];

  constructor({
    directory,
    fileName,
  }: FileNameParams) {
    this.directory = directory;
    this.fileName = fileName;
    this.metaData = [];
  }

  public static satisfiedBy(fileName: unknown): fileName is string {
    return typeof fileName === 'string' && fileName.length > 1;
  }

  make() {
    return {
      path: `${this.directory}/${this.fileName}`,
      ext: this.getExtname(),
    };
  }

  addData({ fileName, template }: { fileName: string; template: string; }) {
    this.metaData.push({
      fileName,
      template,
    });
  }

  data() {
    return this.metaData;
  }

  private getExtname() {
    let ext = extname(this.fileName);
    return ALLOWED_EXTNAMES.includes(ext) ? '.ts' : ext;
  }
}