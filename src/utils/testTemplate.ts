export function testTemplate(functionName: string) {
  const code = [
    `import { ${functionName} } from './${functionName}';`,
    '',
    `description('${functionName}', () => {`,
    '',
    '});',
    ''
  ].join('\n');
  return code;
}
