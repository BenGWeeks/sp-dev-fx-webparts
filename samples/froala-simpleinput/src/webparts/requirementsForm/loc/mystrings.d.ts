declare interface IRequirementsFormStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'mystrings' {
  const strings: IRequirementsFormStrings;
  export = strings;
}
