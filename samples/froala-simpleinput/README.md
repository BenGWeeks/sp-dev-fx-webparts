## angular2-taxonomy

### Summary

This solution contains the a simple component for displaying the Froala Angular 2 WYSIWYG editor within the SPFx framework using Angular 2.

> Note: This repository uses the initial GA release of the SharePoint Framework.

### Prerequisites

You will need the following:

* Node.js (v4 or above)
* NPM (v3 or above)
* Visual Studio Code (recommended)

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-GA-green.svg)

### Building the code

To get up and running, use the following:

```bash
https://github.com/webtechy/sp-dev-fx-webparts.git
```

Then navigate to this project folder, and run the following:

```
npm i
npm i -g gulp
gulp serve
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
gulp build
gulp bundle --ship
gulp package-solution --ship
```

### Further Information

* [AngularJS2 bindings for Froala WYSIWYG HTML Rich Text Editor](https://github.com/froala/angular2-froala-wysiwyg)
* [Overview of the SharePoint Framework](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [SharePoint Framework development tools and libraries](http://dev.office.com/sharepoint/docs/spfx/tools-and-libraries)
* [SharePoint Framework Reference](https://sharepoint.github.io/)
* [Webtechy Blog (Coming coon)](http://www.webtechy.co.uk)

Blog posts of using building these samples will soon be created at the link above - keep posted.

Please feel free to get in touch on Twitter @webtechy.

> Sharing is caring!