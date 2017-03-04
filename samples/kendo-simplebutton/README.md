## kendo-simplebutton

### Summary

This solution contains the setup for developing Kendo UI for Angular 2 components within the SharePoint Framework (SPFx).

> Note: This repository uses the initial GA release of the SharePoint Framework as well as the RC.0 of the Kendo UI for Angular 2.

### Prerequisites

You will need the following:

* Node.js (v4 or above)
* NPM (v3 or above)
* Visual Studio Code (recommended)
* An account with Telerik

To install the npm packages for Kendo UI for Angular 2, we first need to sign-up for an account. To do this, register for a trial at:

http://www.telerik.com/kendo-angular-ui/getting-started/

Enable the Progress (the company that built Kendo UI for Angular 2 for Telerik) NPM registry:

```bash
npm login --registry=https://registry.npm.telerik.com/ --scope=@progress
```

> Note: The username is the first part of your email address before the “@” symbol.

Now confirm it runs, using:

```bash
npm view @progress/kendo-angular-grid versions
```

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-GA-green.svg)

### Building the code

```bash
https://github.com/webtechy/sp-dev-fx-webparts.git
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

```
gulp clean
gulp test
gulp serve
gulp build --ship
gulp bundle --ship
gulp package-solution --ship
```

### Further Information

* [Overview of the SharePoint Framework](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [SharePoint Framework development tools and libraries](http://dev.office.com/sharepoint/docs/spfx/tools-and-libraries)
* [SharePoint Framework Reference](https://sharepoint.github.io/)
* [Kendo UI for Angular 2](http://www.telerik.com/kendo-angular-ui/)
* [Webtechy Blog (Coming coon)](http://www.webtechy.co.uk)

Blog posts of using building these samples will soon be created at the link above - keep posted.

Please feel free to get in touch on Twitter @webtechy.

> Sharing is caring!