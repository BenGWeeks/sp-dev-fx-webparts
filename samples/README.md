## SharePoint Framework client-side web part additional samples

This repository contains additional web parts to be supplied over and above the samples provided in the SharePoint sp-dev-fx-webparts repository.

> Note: This repository uses the initial GA release of the SharePoint Framework as well as the RC.0 of the Kendo UI for Angular 2.

### Using the samples

To build and start using these projects, you'll need to clone and build the projects. 

Clone this repo by executing the following command in your console:

```bash
git clone https://github.com/webtechy/sp-dev-fx-webparts.git
```

Navigate to the cloned repo folder which should be the same as the repo name:

```
cd sp-dev-fx-webparts
```

To access the samples use the following command, where you replace `sample-folder-name` with the name of the sample you want to access. 

```
cd samples
cd sample-folder-name

```

Now run the following command to install the npm packages:

```
npm install
```

This will install the required npm packages and dependencies to build and run the client-side project.


Once the npm packages are installed, run the following command to preview your web parts in SharePoint Workbench:

```
gulp serve
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Building for production

To build for production, use

```
gulp clean
gulp build --ship
gulp bundle --ship
gulp package-solution --ship
```

# Additional resources 

* [Overview of the SharePoint Framework](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [SharePoint Framework development tools and libraries](http://dev.office.com/sharepoint/docs/spfx/tools-and-libraries)
* [SharePoint Framework Reference](https://sharepoint.github.io/)
* [Webtechy Blog (Coming coon)](http://www.webtechy.co.uk)

Blog posts of using building these samples will soon be created at the link above - keep posted.

Please feel free to get in touch on Twitter @webtechy.

> Sharing is caring!