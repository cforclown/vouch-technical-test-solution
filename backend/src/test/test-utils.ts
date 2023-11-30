export function docToJSON (doc: any): Record<string, any> {
  return JSON.parse(JSON.stringify(doc));
}

export function expectDocumentToEqual (doc: any, expectedDoc: any, ignoreTimestamp?: boolean): void {
  const rawDoc = docToJSON(doc);
  const rawExpectedDoc = docToJSON(expectedDoc);

  if (ignoreTimestamp) {
    delete rawExpectedDoc.createdAt;
    delete rawExpectedDoc.updatedAt;
  }

  expect(rawDoc).toMatchObject(rawExpectedDoc);
}
