import { pascalCase } from "change-case-all";

export function functionTemplate(functionName: string) {
  const typeName = `${pascalCase(functionName)}Params`;

  const code = [
    `type ${typeName} = {`,
    '  ',
    '};',
    '',
    `export const ${functionName} = ({}: ${typeName}) => {`,
    '',
    '};'
  ].join('\n');
  return code;
}
