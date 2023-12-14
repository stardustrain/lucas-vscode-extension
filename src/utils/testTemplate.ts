export function testTemplate(functionName: string) {
  const code = [
    `import { ${functionName} } from './${functionName}';`,
    '',
    `describe('${functionName}', () => {`,
    '',
    '});',
    ''
  ].join('\n');
  return code;
}
